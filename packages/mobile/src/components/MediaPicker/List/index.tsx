import React, { useEffect, useState, useCallback, useRef, memo } from 'react'
import { View, ActivityIndicator, Dimensions, FlatList } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { useTranslation } from 'react-i18next'
import { findIndex, propEq, pathOr, omit } from 'rambda'
import { usePostStore } from 'store'
import { logError } from 'utils/sentry'
import { Text } from 'ui'
import { isAndroid } from 'utils/platform'
import { MAX_SELECTED_FILES } from 'store/post'
import MediaItem, { MARGIN, ITEM_SIZE } from '../Item'
import { DeselectAll, Placeholder } from './styles'

const { width } = Dimensions.get('window')

const NUM_COLUMNS = 4
const INITIAL_PAGE_SIZE = 28
const PAGE_SIZE = 48
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
  const [lastEndCursor, setLastEndCursor] = useState()

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

      // NOTE: Dirty fix for fetching same data
      setLastEndCursor(after)

      try {
        const result = await MediaLibrary.getAssetsAsync({
          after,
          album,
          first: PAGE_SIZE,
        })

        // NOTE: Dirty fix for fetching same data
        if (after !== lastEndCursor) {
          setAssets(p => p.concat(result.assets))
        }

        setHasNextPage(result.hasNextPage)
        setEndCursor(result.endCursor)
      } catch (err) {
        logError(err)
      }
    },
    [album, hasNextPage, setAssets, setHasNextPage, setEndCursor, lastEndCursor]
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

  const scrollToTop = useCallback(() => {
    if (ref.current) {
      ref.current.scrollToOffset({ offset: 0 })
    }
  }, [ref])

  const handleOnSelect = useCallback(
    item => {
      const selected = selectedFiles.some(file => file.id === item.id)

      if (!selected && selectedFiles.length !== MAX_SELECTED_FILES) {
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
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        initialNumToRender={INITIAL_PAGE_SIZE}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={<Placeholder>{ListHeaderComponent()}</Placeholder>}
        numColumns={NUM_COLUMNS}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        removeClippedSubviews={isAndroid}
        renderItem={renderItem}
        snapToEnd={false}
        snapToOffsets={[SNAP_TO_OFFSET]}
        windowSize={17}
      />

      {selectedFiles.length > 0 && (
        <DeselectAll activeOpacity={0.9} onPress={handleDeselectAll} naviteHandler>
          <Text medium fontSize={15} color="black">
            {t('MediaPickerList:deselectAll')}
          </Text>
        </DeselectAll>
      )}
    </>
  )
}

export default memo(List)
