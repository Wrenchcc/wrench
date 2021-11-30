import React, { useState, useCallback, useEffect } from 'react'
import { ActivityIndicator, View, FlatList } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { store } from 'gql'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import * as MediaLibrary from 'expo-media-library'
import Item, { MARGIN, ITEM_SIZE } from '../Item'
import { INITIAL_PAGE_SIZE, PAGE_SIZE, DRAG_BAR, TAB_BAR_HEIGHT } from '../constants'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

function MediaSelector({ onScroll, spacing, album: selectedAlbum }) {
  const [assets, setAssets] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [endCursor, setEndCursor] = useState()
  const [lastEndCursor, setLastEndCursor] = useState()

  const selectedFiles = useReactiveVar(store.files.selectedFilesVar)

  useEffect(() => {
    if (!assets.length) {
      fetchInitialAssets(null)
    }
  }, [])

  const fetchInitialAssets = useCallback(async (album) => {
    try {
      const result = await MediaLibrary.getAssetsAsync({
        first: INITIAL_PAGE_SIZE,
        album: album?.id,
        mediaType: [MediaLibrary.MediaType.photo],
        sortBy: MediaLibrary.SortBy.creationTime,
      })

      setAssets(result.assets)
      setHasNextPage(result.hasNextPage)
      setEndCursor(result.endCursor)
      store.files.select(result.assets[0])
    } catch {}
  }, [])

  const fetchMoreAssets = useCallback(
    async (after) => {
      if (!hasNextPage) {
        return
      }
      // NOTE: Dirty fix for fetching same data
      setLastEndCursor(after)

      try {
        const result = await MediaLibrary.getAssetsAsync({
          after,
          album: selectedAlbum.id,
          first: PAGE_SIZE,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        })
        // NOTE: Dirty fix for fetching same data
        if (after !== lastEndCursor) {
          setAssets((p) => p.concat(result.assets))
        }
        setHasNextPage(result.hasNextPage)
        setEndCursor(result.endCursor)
      } catch (err) {
        // logError(err)
      }
    },
    [hasNextPage, setAssets, setHasNextPage, setEndCursor, lastEndCursor, selectedAlbum]
  )

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchMoreAssets(endCursor)
    }
  }, [hasNextPage, endCursor, fetchMoreAssets])

  const handleOnSelect = useCallback((item) => {
    store.files.select(item)
    // cropAreaY.value = withTiming(CROP_FULLY_DOWN, {
    //   duration: TIMING_DURATION,
    // })
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
    <Animated.View style={{ flex: 1, marginTop: DRAG_BAR, marginBottom: TAB_BAR_HEIGHT }}>
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
