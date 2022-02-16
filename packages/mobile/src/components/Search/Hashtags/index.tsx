import React, { memo, useEffect, useState, useCallback } from 'react'
import { View, Keyboard } from 'react-native'
import { useReactiveVar, store } from 'gql'
import { storage, useMMKVString } from 'utils/storage'
import { useTranslation } from 'react-i18next'
import { usePaginatedLazyQuery, SearchHashtagsDocument } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { RECENT_SEARCHES_HASHTAGS } from 'utils/storage/constants'
import { InfiniteList, NoResults, Loader, Text, Hashtag } from 'ui'
import Skeleton from 'ui/Hashtag/SkeletonList'

const MAX_ITEMS = 4

const styles = {
  header: {
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
}

function Hashtags() {
  const { t } = useTranslation('search')
  const [savedRecent, setSavedRecent] = useMMKVString(RECENT_SEARCHES_HASHTAGS)
  const [recent, setRecent] = useState(savedRecent ? JSON.parse(savedRecent) : [])
  const query = useReactiveVar(store.search.queryVar)

  const { navigate } = useNavigation()

  const {
    loadData,
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedLazyQuery(['hashtags'])(SearchHashtagsDocument)

  useEffect(() => {
    if (query) {
      loadData({
        variables: {
          query,
        },
      })
    }
  }, [query])

  const handleSave = useCallback(
    (item) => {
      // NOTE: isOwner to hide the follow button
      const items = [{ node: item }, ...recent]
      const saved = recent.some(({ node }) => node.id === item.id)

      if (!saved) {
        if (items.length === MAX_ITEMS) {
          const limitedItems = items.slice(0, -1)
          setRecent(limitedItems)

          setSavedRecent(JSON.stringify(limitedItems))
        } else {
          setRecent(items)
          setSavedRecent(JSON.stringify(items))
        }
      }
    },
    [recent, setRecent]
  )

  const handleRemove = useCallback(() => {
    setRecent([])
    storage.delete(RECENT_SEARCHES_HASHTAGS)
  }, [setRecent])

  const renderItem = ({ item }) => {
    const onPress = () => {
      Keyboard.dismiss()
      handleSave(item.node)

      navigate(SCREENS.HASHTAG, {
        name: item.node.name,
      })
    }

    return <Hashtag {...item.node} onPress={onPress} />
  }

  const ListEmptyComponent =
    isFetching && !isRefetching ? <Skeleton /> : !isFetching && query.length > 1 && <NoResults />

  const ListHeaderComponent = !query && recent.length > 0 && (
    <View style={styles.header}>
      <Text medium>{t('recent')}</Text>
      <Text fontSize={14} onPress={handleRemove} medium>
        {t('clear')}
      </Text>
    </View>
  )

  const ListFooterComponent = hasNextPage && query && <Loader />

  return (
    <InfiniteList
      borderSeparator
      initialNumToRender={10}
      ListEmptyComponent={ListEmptyComponent}
      data={query ? edges : recent}
      fetchMore={fetchMore}
      hasNextPage={isFetching ? false : hasNextPage}
      isFetching={isFetching && query.length === 0}
      isRefetching={isRefetching}
      refetch={query && refetch}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
    />
  )
}

export default memo(Hashtags)
