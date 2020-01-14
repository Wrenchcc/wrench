import React, { useEffect, useState, useCallback, useRef, memo } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import * as MediaLibrary from '@pontusab/react-native-media-library'
import { findIndex, propEq, pathOr, omit } from 'rambda'
import { usePostStore } from 'store'
import { logError } from 'utils/sentry'
import MediaItem, { MARGIN } from '../Item'

const NUM_COLUMNS = 4
const INITIAL_PAGE_SIZE = 12
const PAGE_SIZE = 48

const keyExtractor = item => item.uri

// const getItemLayout = (_, index) => ({
//   index,
//   length: Math.round(ITEM_SIZE),
//   offset: Math.round(ITEM_SIZE) * index,
// })

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

function List({ album, onScroll, contentContainerStyle }) {
  const [assets, setAssets] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [endCursor, setEndCursor] = useState()

  const { selectedFiles, onSelect } = usePostStore(store => ({
    deselectAll: store.actions.deselectAll,
    onSelect: store.actions.onSelect,
    selectedFiles: store.selectedFiles,
  }))

  const fetchInitialAssets = useCallback(async () => {
    try {
      const result = await MediaLibrary.getAssetsAsync({
        album,
        first: INITIAL_PAGE_SIZE,
      })

      setAssets(result.assets)
      setHasNextPage(result.hasNextPage)
      setEndCursor(result.endCursor)
    } catch (err) {
      logError(err)
    }
  }, [album, setAssets, setHasNextPage, setEndCursor])

  const fetchMoreAssets = useCallback(
    async after => {
      if (!hasNextPage) {
        return
      }

      try {
        const result = await MediaLibrary.getAssetsAsync({
          after,
          album,
          first: PAGE_SIZE,
        })

        setAssets(p => p.concat(result.assets))

        setHasNextPage(result.hasNextPage)
        setEndCursor(result.endCursor)
      } catch (err) {
        logError(err)
      }
    },
    [album, hasNextPage, setAssets, setHasNextPage, setEndCursor]
  )

  useEffect(() => {
    fetchInitialAssets()
  }, [album])

  // Add camera file to list
  useEffect(() => {
    if (
      pathOr(false, [0, 'camera'], selectedFiles) &&
      pathOr(false, [0, 'id'], assets) !== pathOr(false, [0, 'id'], selectedFiles)
    ) {
      setAssets([omit(['camera'], selectedFiles[0]), ...assets])
    }
  }, [selectedFiles])

  const onEndReached = useCallback(
    ({ distanceFromEnd }) => {
      if (hasNextPage && distanceFromEnd > 0) {
        fetchMoreAssets(endCursor)
      }
    },
    [hasNextPage, endCursor, fetchMoreAssets]
  )

  const handleOnSelect = useCallback(
    item => {
      onSelect(item)
    },
    [onSelect]
  )

  const renderItem = ({ item }) => {
    const order = findIndex(propEq('id', item.id))(selectedFiles)
    const selected = selectedFiles.some(file => file.id === item.id)
    return <MediaItem item={item} onPress={handleOnSelect} order={order + 1} selected={selected} />
  }

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

  return (
    <AnimatedFlatList
      onScroll={onScroll}
      contentContainerStyle={{ padding: MARGIN, ...contentContainerStyle }}
      data={assets}
      // getItemLayout={getItemLayout}
      initialNumToRender={INITIAL_PAGE_SIZE}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderFooter}
      numColumns={NUM_COLUMNS}
      onEndReached={onEndReached}
      // onEndReachedThreshold={0.4}
      // removeClippedSubviews={isAndroid}
      renderItem={renderItem}
      // windowSize={17}
    />
  )
}

export default memo(List)
