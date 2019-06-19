import React, { useEffect, useState, useCallback, memo } from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { useStore } from 'store'
import { logError } from 'utils/sentry'
import MediaItem from '../Item'

const NUM_COLUMNS = 4
const PAGE_SIZE = 30

const keyExtractor = item => item.uri

function List({ album }) {
  const [assets, setAssets] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [endCursor, setEndCursor] = useState()

  const { files, onSelect } = useStore(store => ({
    files: store.post.files,
    onSelect: store.actions.onSelect,
  }))

  console.log(files)

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

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchAssets(endCursor)
    }
  }, [hasNextPage, endCursor, fetchAssets])

  const renderItem = ({ item }) => {
    return <MediaItem item={item} onPress={onSelect} order={0} selected={false} />
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
