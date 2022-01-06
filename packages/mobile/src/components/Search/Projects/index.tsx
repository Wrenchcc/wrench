import React, { memo, useEffect, useState, useCallback } from 'react'
import { Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useReactiveVar, store } from 'gql'
import { storage, useMMKVString } from 'utils/storage'
import { usePaginatedLazyQuery, SearchProjectsDocument } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { RECENT_SEARCHES_PROJECTS } from 'utils/storage/constants'
import { ProjectCard, InfiniteList, NoResults, SearchingFor, Loader, Text } from 'ui'
import { Header } from '../styles'

const MAX_ITEMS = 4

function Projects() {
  const { t } = useTranslation('search')
  const [savedRecent, setSavedRecent] = useMMKVString(RECENT_SEARCHES_PROJECTS)
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

  const handleSave = useCallback(
    (item) => {
      // NOTE: isOwner to hide the follow button
      const items = [{ node: { ...item, permissions: { isOwner: true } } }, ...recent]
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
    storage.delete(RECENT_SEARCHES_PROJECTS)
  }, [setRecent])

  const renderItem = ({ item }) => {
    const onPress = () => {
      Keyboard.dismiss()
      handleSave(item.node)

      navigate(SCREENS.PROJECT, {
        id: item.node.id,
        project: item.node,
      })
    }

    return <ProjectCard project={item.node} onPress={onPress} />
  }

  return (
    <InfiniteList
      borderSeparator
      initialNumToRender={4}
      paddingBottom={40}
      ListEmptyComponent={!isFetching && query.length > 1 && <NoResults />}
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
}

export default memo(Projects)
