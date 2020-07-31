import React, { memo, useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useTranslation } from 'react-i18next'
import { usePaginatedLazyQuery, SearchProjectsDocument } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { RECENT_SEARCHES_PROJECTS } from 'utils/storage/constants'
import { logError } from 'utils/sentry'
import { ProjectCard, InfiniteList, NoResults, SearchingFor, Loader, Text } from 'ui'
import { Header } from '../styles'
import { Keyboard } from 'react-native'

const MAX_ITEMS = 4

function Projects({ query }) {
  const { t } = useTranslation()
  const [recent, setRecent] = useState([])

  const { navigate } = useNavigation()

  const {
    loadData,
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedLazyQuery(['projects'])(SearchProjectsDocument)

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
      const items = JSON.parse(await AsyncStorage.getItem(RECENT_SEARCHES_PROJECTS))

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
      // NOTE: isOwner to hide the follow button
      const items = [{ node: { ...item, permissions: { isOwner: true } } }, ...recent]
      const saved = recent.some(({ node }) => node.id === item.id)

      if (!saved) {
        if (items.length === MAX_ITEMS) {
          const limitedItems = items.slice(0, -1)
          setRecent(limitedItems)

          AsyncStorage.setItem(RECENT_SEARCHES_PROJECTS, JSON.stringify(limitedItems))
        } else {
          setRecent(items)
          AsyncStorage.setItem(RECENT_SEARCHES_PROJECTS, JSON.stringify(items))
        }
      }
    },
    [recent, setRecent]
  )

  const handleRemove = useCallback(() => {
    setRecent([])
    AsyncStorage.removeItem(RECENT_SEARCHES_PROJECTS)
  }, [setRecent])

  const renderItem = ({ item }) => {
    const onPress = () => {
      Keyboard.dismiss()
      handleSave(item.node)

      navigate(SCREENS.PROJECT, {
        id: item.node.id,
        project: item.node,
        options: {
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      })
    }

    return <ProjectCard project={item.node} onPress={onPress} />
  }

  return (
    <InfiniteList
      borderSeparator
      initialNumToRender={4}
      paddingBottom={40}
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
            <Text medium>{t('Search:recent')}</Text>
            <Text fontSize={14} onPress={handleRemove} medium>
              {t('Search:clear')}
            </Text>
          </Header>
        )
      }
      ListFooterComponent={
        isFetching && !edges ? <SearchingFor query={query} /> : hasNextPage && query && <Loader />
      }
    />
  )
}

export default memo(Projects)
