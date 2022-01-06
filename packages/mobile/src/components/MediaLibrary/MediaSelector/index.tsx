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

const styles = {
  loader: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  header: {
    width: '100%',
  },
  list: {
    marginLeft: -MARGIN,
  },
}

function MediaSelector({ onScroll, spacing, onSelect, onPermission }) {
  const [assets, setAssets] = useState([])
  const [hasNextPage, setHasNextPage] = useState(false)

  const endCursor = useRef('')
  const lastEndCursor = useRef('')
  const init = useRef(false)

  const selectedAlbum = useReactiveVar(store.files.selectedAlbumVar)

  useEffect(() => {
    fetchInitialAssets(selectedAlbum)
  }, [selectedAlbum?.id])

  const fetchInitialAssets = async (album?: string) => {
    try {
      const result = await MediaLibrary.getAssetsAsync({
        first: INITIAL_PAGE_SIZE,
        album: album?.id,
        mediaType: [MediaLibrary.MediaType.photo],
        sortBy: MediaLibrary.SortBy.creationTime,
      })

      if (!init.current) {
        store.files.select(result.assets[0])
        init.current = true
      }

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
        setHasNextPage(false)
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
    onSelect(item)
  }, [])

  const renderFooter = useCallback(() => {
    if (hasNextPage && assets.length) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator color="white" />
        </View>
      )
    }

    return null
  }, [hasNextPage, assets])

  const renderItem = ({ item }) => <Item onPress={handleOnSelect} item={item} />

  const spacingStyle = useAnimatedStyle(() => ({
    height: spacing.value,
  }))

  return (
    <Animated.View style={{ flex: 1, marginTop: DRAG_BAR }}>
      <AnimatedFlatList
        ListHeaderComponent={<Animated.View style={[styles.header, spacingStyle]} />}
        onScroll={onScroll}
        scrollEventThrottle={1}
        automaticallyAdjustContentInsets={false}
        numColumns={4}
        ListFooterComponent={renderFooter}
        data={assets}
        keyExtractor={(item) => item.id}
        initialNumToRender={PAGE_SIZE}
        style={styles.list}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
      />
    </Animated.View>
  )
}

export default React.memo(MediaSelector)
