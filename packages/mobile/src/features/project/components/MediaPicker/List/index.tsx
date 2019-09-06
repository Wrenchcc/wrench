import React, { useEffect, useState, useCallback, useRef, memo } from 'react'
import { View, ActivityIndicator, Dimensions, FlatList } from 'react-native'
import * as MediaLibrary from 'react-native-media-library'
import { useTranslation } from 'react-i18next'
import { findIndex, propEq, pathOr, omit } from 'ramda'
import { usePostStore } from 'store'
import { logError } from 'utils/sentry'
import { Text } from 'ui'
import { isAndroid } from 'utils/platform'
import MediaItem, { MARGIN, ITEM_SIZE } from '../Item'
import { DeselectAll } from './styles'

const { width } = Dimensions.get('window')

const NUM_COLUMNS = 4
const INITIAL_PAGE_SIZE = 30
const PAGE_SIZE = 10
const SNAP_TO_OFFSET = width + MARGIN

const keyExtractor = item => item.uri

const getItemLayout = (_, index) => ({
  index,
  length: Math.round(ITEM_SIZE),
  offset: Math.round(ITEM_SIZE) * index,
})

function List({ album, ListHeaderComponent }) {
  const [assets, setAssets] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [endCursor, setEndCursor] = useState()
  const ref = useRef()
  const { t } = useTranslation()

  const { selectedFiles, onSelect, deselectAll } = usePostStore(store => ({
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

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchMoreAssets(endCursor)
    }
  }, [hasNextPage, endCursor, fetchMoreAssets])

  const scrollToTop = useCallback(() => {
    if (ref.current) {
      ref.current.scrollToOffset({ offset: 0 })
    }
  }, [ref])

  const handleOnSelect = useCallback(
    item => {
      const selected = selectedFiles.some(file => file.id === item.id)

      if (!selected) {
        scrollToTop()
      }

      onSelect(item)
    },
    [selectedFiles, scrollToTop, onSelect]
  )

  const handleDeselectAll = useCallback(() => {
    deselectAll()
    scrollToTop()
  }, [deselectAll, scrollToTop])

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
    <>
      <FlatList
        ref={ref}
        contentContainerStyle={{ padding: MARGIN }}
        data={assets}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={ListHeaderComponent}
        numColumns={NUM_COLUMNS}
        onEndReached={onEndReached}
        decelerationRate="fast"
        renderItem={renderItem}
        snapToEnd={false}
        snapToOffsets={[SNAP_TO_OFFSET]}
        removeClippedSubviews={isAndroid}
        windowSize={17}
        onEndReachedThreshold={0.9}
      />

      {selectedFiles.length > 0 && (
        <DeselectAll activeOpacity={0.9} onPress={handleDeselectAll} naviteHandler>
          <Text medium fontSize={15}>
            {t('MediaPickerList:deselectAll')}
          </Text>
        </DeselectAll>
      )}
    </>
  )
}

export default memo(List)
