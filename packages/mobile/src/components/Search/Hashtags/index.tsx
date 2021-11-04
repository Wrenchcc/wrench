import React, { memo, useEffect, useState, useCallback } from 'react'
import { Keyboard } from 'react-native'
import { storage, useMMKVString } from 'utils/storage'
import { useTranslation } from 'react-i18next'
import { usePaginatedLazyQuery, SearchHashtagsDocument } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { RECENT_SEARCHES_HASHTAGS } from 'utils/storage/constants'
import { InfiniteList, NoResults, SearchingFor, Loader, Text, Hashtag } from 'ui'
import HashtagSkeletonList from 'ui/Hashtag/SkeletonList'
import { Header } from '../styles'

const ITEM_HEIGHT = 68
const MAX_ITEMS = 4

function getItemLayout(_, index) {
  return {
    index,
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
  }
}

function Hashtags({ query }) {
  const { t } = useTranslation('search')
  const [savedRecent, setSavedRecent] = useMMKVString(RECENT_SEARCHES_HASHTAGS)
  const [recent, setRecent] = useState(savedRecent ? JSON.parse(savedRecent) : [])

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

          setSavedRecent(RECENT_SEARCHES_HASHTAGS, JSON.stringify(limitedItems))
        } else {
          setRecent(items)
          setSavedRecent(RECENT_SEARCHES_HASHTAGS, JSON.stringify(items))
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
        options: {
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      })
    }

    return <Hashtag {...item.node} onPress={onPress} />
  }

  const content =
    isFetching && !edges ? (
      <HashtagSkeletonList contentInset={0} marginTop={15} />
    ) : (
      <InfiniteList
        borderSeparator
        initialNumToRender={4}
        paddingBottom={40}
        getItemLayout={getItemLayout}
        ListEmptyComponent={!isFetching && query.length > 0 && <NoResults />}
        data={query ? edges : recent}
        fetchMore={fetchMore}
        hasNextPage={isFetching ? false : hasNextPage}
        isFetching={isFetching && query.length === 0}
        isRefetching={isRefetching}
        refetch={refetch}
        renderItem={renderItem}
        defaultPadding
        ListHeaderComponent={
          !query &&
          recent.length > 0 && (
            <Header>
              <Text medium>{t('recent')}</Text>
              <Text fontSize={14} onPress={handleRemove} medium>
                {t('clear')}
              </Text>
            </Header>
          )
        }
        ListFooterComponent={
          isFetching && !edges ? <SearchingFor query={query} /> : hasNextPage && query && <Loader />
        }
      />
    )

  return content
}

export default memo(Hashtags)
