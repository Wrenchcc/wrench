import React, { useEffect, useState, useCallback, memo } from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { findIndex, propEq, pathOr, omit } from 'ramda'
import { usePostStore } from 'store'
import { logError } from 'utils/sentry'
import MediaItem from '../Item'

const NUM_COLUMNS = 4
const PAGE_SIZE = 30

const keyExtractor = item => item.uri

function List({ album }) {
  const [assets, setAssets] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [endCursor, setEndCursor] = useState()

  const { files, onSelect } = usePostStore(store => ({
    files: store.files,
    onSelect: store.actions.onSelect,
  }))

  const fetchAssets = useCallback(
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
    fetchAssets()
  }, [])

  // Add camera file to list
  useEffect(() => {
    if (
      !album &&
      pathOr(false, [0, 'camera'], files) &&
      pathOr(false, [0, 'id'], assets) !== pathOr(false, [0, 'id'], files)
    ) {
      setAssets([omit(['camera'], files[0]), ...assets])
    }
  }, [files, album])

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchAssets(endCursor)
    }
  }, [hasNextPage, endCursor, fetchAssets])

  const renderItem = ({ item }) => {
    const order = findIndex(propEq('id', item.id))(files)
    const selected = files.some(file => file.id === item.id)
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

  const renderLoadingComponent = () => null
  //  (
  //   <View style={{ flex: 1, justifyContent: 'center' }}>
  //     <ActivityIndicator color="white" />
  //   </View>
  // )

  return (
    <FlatList
      contentContainerStyle={{ padding: 3 }}
      data={assets}
      initialNumToRender={16}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderLoadingComponent}
      numColumns={NUM_COLUMNS}
      onEndReached={onEndReached}
      renderItem={renderItem}
    />
  )
}

export default memo(List)
