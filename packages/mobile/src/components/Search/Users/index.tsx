import React, { useEffect, useState, useCallback } from 'react'
import { Keyboard } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useTranslation } from 'react-i18next'
import { usePaginatedLazyQuery, SearchUsersDocument } from '@wrench/common'
import { User, InfiniteList, NoResults, Loader, Text } from 'ui'
import { RECENT_SEARCHES_USERS } from 'utils/storage/constants'
import { logError } from 'utils/sentry'
import UserSkeletonList from 'ui/User/SkeletonList'
import { Header } from '../styles'

const ITEM_HEIGHT = 71
const MAX_ITEMS = 8

const getItemLayout = (_, index) => ({
  index,
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
})

function Users({ query }) {
  const { t } = useTranslation('search')
  const [recent, setRecent] = useState([])

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

  async function loadRecentAsync() {
    try {
      const items = JSON.parse(await AsyncStorage.getItem(RECENT_SEARCHES_USERS))

      if (items) {
        setRecent(items)
      }
    } catch (err) {
      logError(err)
    }
  }

  useEffect(() => {
    loadRecentAsync()
  }, [])

  const handleSave = useCallback(
    (item) => {
      Keyboard.dismiss()

      const items = [{ node: { ...item, isOnline: false } }, ...recent]
      const saved = recent.some(({ node }) => node.id === item.id)

      if (!saved) {
        if (items.length === MAX_ITEMS) {
          const limitedItems = items.slice(0, -1)
          setRecent(limitedItems)

          AsyncStorage.setItem(RECENT_SEARCHES_USERS, JSON.stringify(limitedItems))
        } else {
          setRecent(items)
          AsyncStorage.setItem(RECENT_SEARCHES_USERS, JSON.stringify(items))
        }
      }
    },
    [recent, setRecent]
  )

  const handleRemove = useCallback(() => {
    setRecent([])
    AsyncStorage.removeItem(RECENT_SEARCHES_USERS)
  }, [setRecent])

  const content =
    isFetching && !edges ? (
      <UserSkeletonList contentInset={null} contentOffset={null} marginTop={15} />
    ) : (
      <InfiniteList
        borderSeparator
        paddingBottom={40}
        getItemLayout={getItemLayout}
        ListEmptyComponent={!isFetching && query.length > 0 && <NoResults />}
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
