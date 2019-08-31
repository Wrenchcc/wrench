import React, { useEffect, useState, useCallback, memo } from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import * as MediaLibrary from 'react-native-media-library'
import { findIndex, propEq, pathOr, omit } from 'ramda'
import { usePostStore } from 'store'
import { logError } from 'utils/sentry'
import MediaItem from '../Item'

const NUM_COLUMNS = 4
const PAGE_SIZE = 30
const FIRST_PAGE_SIZE = 12

const keyExtractor = item => item.uri

function List({ album }) {
  const [assets, setAssets] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [endCursor, setEndCursor] = useState()

  const { selectedFiles, onSelect } = usePostStore(store => ({
    selectedFiles: store.selectedFiles,
    onSelect: store.actions.onSelect,
  }))

  const fetchInitialAssets = useCallback(async () => {
    try {
      const result = await MediaLibrary.getAssetsAsync({
        album,
        first: FIRST_PAGE_SIZE,
      })

      setAssets(result.assets)
      setHasNextPage(result.hasNextPage)
      setEndCursor(result.endCursor)
    } catch (err) {
      logError(err)
    }
  }, [album])

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
    [album]
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

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchMoreAssets(endCursor)
    }
  }, [hasNextPage, endCursor, fetchMoreAssets])

  const renderItem = ({ item }) => {
    const order = findIndex(propEq('id', item.id))(selectedFiles)
    const selected = selectedFiles.some(file => file.id === item.id)
    return <MediaItem item={item} onPress={onSelect} order={order + 1} selected={selected} />
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
  }, [hasNextPage])

  return (
    <FlatList
      contentContainerStyle={{ padding: 3 }}
      data={assets}
      initialNumToRender={16}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderFooter}
      numColumns={NUM_COLUMNS}
      onEndReached={onEndReached}
      renderItem={renderItem}
    />
  )
}

export default memo(List)
