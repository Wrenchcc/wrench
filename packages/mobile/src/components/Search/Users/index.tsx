import React, { useEffect, useState, useCallback } from 'react'
import { Keyboard } from 'react-native'
import { storage, useMMKVString } from 'utils/storage'
import { useTranslation } from 'react-i18next'
import { usePaginatedLazyQuery, SearchUsersDocument } from '@wrench/common'
import { useReactiveVar, store } from 'gql'
import { User, InfiniteList, NoResults, Loader, Text } from 'ui'
import { RECENT_SEARCHES_USERS } from 'utils/storage/constants'
import UserSkeletonList from 'ui/User/SkeletonList'
import { Header } from '../styles'

const MAX_ITEMS = 8

function Users() {
  const { t } = useTranslation('search')
  const [savedRecent, setSavedRecent] = useMMKVString(RECENT_SEARCHES_USERS)
  const [recent, setRecent] = useState(savedRecent ? JSON.parse(savedRecent) : [])
  const query = useReactiveVar(store.search.queryVar)

  const {
    loadData,
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedLazyQuery(['users'])(SearchUsersDocument)

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
      Keyboard.dismiss()

      const items = [{ node: { ...item, isOnline: false } }, ...recent]
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
    storage.delete(RECENT_SEARCHES_USERS)
  }, [setRecent])

  const content =
    isFetching && !edges ? (
      <UserSkeletonList marginTop={15} />
    ) : (
      <InfiniteList
        borderSeparator
        ListEmptyComponent={!isFetching && query.length > 1 && <NoResults />}
        data={query ? edges : recent}
        fetchMore={fetchMore}
        hasNextPage={isFetching ? false : hasNextPage}
        isFetching={isFetching && query.length === 0}
        isRefetching={isRefetching}
        refetch={refetch}
        renderItem={({ item }) => <User data={item.node} onPress={handleSave} />}
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
        ListFooterComponent={hasNextPage && query && <Loader />}
      />
    )

  return content
}

export default Users
