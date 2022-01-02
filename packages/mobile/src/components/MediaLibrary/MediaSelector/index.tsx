import React, { useState, useCallback, useEffect, useRef } from 'react'
import { ActivityIndicator, View, FlatList } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { store } from 'gql'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import * as MediaLibrary from 'expo-media-library'
import Item, { MARGIN, ITEM_SIZE } from '../Item'
import { INITIAL_PAGE_SIZE, PAGE_SIZE, DRAG_BAR } from '../constants'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

function MediaSelector({ onScroll, spacing, onSelect, onPermission }) {
  const [assets, setAssets] = useState([])
  const [hasNextPage, setHasNextPage] = useState(false)

  const endCursor = useRef('')
  const lastEndCursor = useRef('')

  const selectedFiles = useReactiveVar(store.files.selectedFilesVar)
  const selectedAlbum = useReactiveVar(store.files.selectedAlbumVar)

  useEffect(() => {
    fetchInitialAssets(selectedAlbum)
  }, [selectedAlbum?.id])

  const fetchInitialAssets = useCallback(async (album?: string) => {
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
      store.files.select(result.assets[0])
    } catch {
      onPermission()
    }
  }, [])

  const fetchMoreAssets = useCallback(
    async (after) => {
      if (!hasNextPage) {
        return
      }

      // NOTE: Dirty fix for fetching same data
      lastEndCursor.current = after

      try {
        const result = await MediaLibrary.getAssetsAsync({
          after,
          album: selectedAlbum?.id,
          first: PAGE_SIZE,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        })
        // NOTE: Dirty fix for fetching same data
        if (after !== lastEndCursor) {
          setAssets((p) => p.concat(result.assets))
        }

        setHasNextPage(result.hasNextPage)
        endCursor.current = result.endCursor
      } catch (err) {
        console.log(err)
        // logError(err)
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
        windowSize={17}
        ListFooterComponent={renderFooter}
        data={assets}
        keyExtractor={(item) => item.id}
        initialNumToRender={PAGE_SIZE}
        style={{ marginLeft: -MARGIN }}
        getItemLayout={(_, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * index,
          index,
        })}
        renderItem={renderItem}
        onEndReached={onEndReached}
      />
    </Animated.View>
  )
}

export default MediaSelector
