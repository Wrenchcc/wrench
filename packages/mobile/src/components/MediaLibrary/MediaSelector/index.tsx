import React, { useState, useCallback, useEffect, useRef } from 'react'
import { ActivityIndicator, View, FlatList } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { store } from 'gql'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import * as MediaLibrary from 'expo-media-library'
import { logError } from 'utils/sentry'
import Item, { MARGIN } from '../Item'
import { INITIAL_PAGE_SIZE, PAGE_SIZE, DRAG_BAR } from '../constants'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

function MediaSelector({ onScroll, spacing, onSelect, onPermission }) {
  const [assets, setAssets] = useState([])
  const [hasNextPage, setHasNextPage] = useState(false)

  const endCursor = useRef('')
  const lastEndCursor = useRef('')
  const init = useRef(false)

  const selectedFiles = useReactiveVar(store.files.selectedFilesVar)
  const selectedAlbum = useReactiveVar(store.files.selectedAlbumVar)

  useEffect(() => {
    fetchInitialAssets(selectedAlbum)
  }, [selectedAlbum?.id])

  useEffect(() => {
    if (!init.current && assets.length) {
      store.files.select(assets[0])
      init.current = true
    }
  }, [assets])

  const fetchInitialAssets = async (album?: string) => {
    try {
      const result = await MediaLibrary.getAssetsAsync({
        first: INITIAL_PAGE_SIZE,
        album: album?.id,
        mediaType: [MediaLibrary.MediaType.photo],
        sortBy: MediaLibrary.SortBy.creationTime,
      })

      setAssets(result.assets)
      setHasNextPage(result.hasNextPage)
      endCursor.current = result.endCursor
    } catch {
      onPermission()
    }
  }

  const fetchMoreAssets = useCallback(
    async (after) => {
      if (!hasNextPage) {
        return
      }

      try {
        const result = await MediaLibrary.getAssetsAsync({
          after,
          album: selectedAlbum?.id,
          first: PAGE_SIZE,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        })

        if (after !== lastEndCursor.current) {
          setAssets((p) => p.concat(result.assets))
        }

        setHasNextPage(result.hasNextPage)
        endCursor.current = result.endCursor
        lastEndCursor.current = after
      } catch (err) {
        logError(err)
      }
    },
    [selectedAlbum, hasNextPage]
  )

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchMoreAssets(endCursor.current)
    }
  }, [hasNextPage, endCursor])

  const handleOnSelect = useCallback((item) => {
    store.files.select(item)
    onSelect()
  }, [])

  const renderFooter = useCallback(() => {
    if (hasNextPage && assets.length) {
      return (
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <ActivityIndicator color="white" />
        </View>
      )
    }

    return null
  }, [hasNextPage, assets])

  const renderItem = ({ item }) => {
    const order = selectedFiles.findIndex((e) => e.id === item.id)
    const selected = selectedFiles.some((file) => file.id === item.id)
    return <Item onPress={handleOnSelect} item={item} selected={selected} order={order + 1} />
  }

  const spacingStyle = useAnimatedStyle(() => ({
    height: spacing.value,
  }))

  return (
    <Animated.View style={{ flex: 1, marginTop: DRAG_BAR }}>
      <AnimatedFlatList
        ListHeaderComponent={<Animated.View style={[{ width: '100%' }, spacingStyle]} />}
        onScroll={onScroll}
        scrollEventThrottle={1}
        automaticallyAdjustContentInsets={false}
        numColumns={4}
        ListFooterComponent={renderFooter}
        data={assets}
        keyExtractor={(item) => item.id}
        initialNumToRender={PAGE_SIZE}
        style={{ marginLeft: -MARGIN }}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </Animated.View>
  )
}

export default MediaSelector
