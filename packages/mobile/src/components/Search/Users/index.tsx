import React, { useEffect, useState, useCallback } from 'react'
import { Keyboard } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useTranslation } from 'react-i18next'
import { useLazyQuery } from '@apollo/client'
import { SearchUsersDocument } from '@wrench/common'
import { User, InfiniteList, NoResults, Loader, Text } from 'ui'
import { RECENT_SEARCHES_USERS } from 'utils/storage/constants'
import { logError } from 'utils/sentry'
import UserPlaceholderCollection from 'ui/User/PlaceholderCollection'
import { Header } from '../styles'

const ITEM_HEIGHT = 71
const MAX_ITEMS = 8

const getItemLayout = (_, index) => ({
  index,
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
})

function Users({ query }) {
  const { t } = useTranslation()
  const [recent, setRecent] = useState([])

  const [loadData, { data = {}, loading, fetchMore, refetch = () => {} }] = useLazyQuery(
    SearchUsersDocument
  )

  const isRefetching = false //loading && !edges

  const edges = data?.users?.edges || []
  const hasNextPage = data?.users?.pageInfo?.hasNextPage

  const after = edges[edges.length - 1]?.cursor

  const handleFetchMore = useCallback(() => {
    fetchMore({
      variables: {
        after,
      },
    })
  }, [after])

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
        // setRecent(items)
      }
    } catch (err) {
      logError(err)
    }
  }

  useEffect(() => {
    // loadRecentAsync()
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
    // setRecent([])
    AsyncStorage.removeItem(RECENT_SEARCHES_USERS)
  }, [setRecent])

  const content =
    loading && !edges ? (
      <UserPlaceholderCollection contentInset={0} marginTop={15} />
    ) : (
      <InfiniteList
        borderSeparator
        paddingBottom={40}
        getItemLayout={getItemLayout}
        ListEmptyComponent={!loading && query.length > 0 && <NoResults />}
        data={query ? edges : recent}
        fetchMore={handleFetchMore}
        hasNextPage={loading ? false : hasNextPage}
        isFetching={loading && query.length === 0}
        isRefetching={isRefetching}
        refetch={refetch}
        renderItem={({ item }) => <User data={item.node} onPress={handleSave} />}
        defaultPadding
        ListHeaderComponent={
          !query &&
          recent.length > 0 && (
            <Header>
              <Text medium>{t('Search:recent')}</Text>
              <Text fontSize={14} onPress={handleRemove} medium>
                {t('Search:clear')}
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
