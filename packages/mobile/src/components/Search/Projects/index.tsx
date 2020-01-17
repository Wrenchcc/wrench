import React, { memo, useEffect } from 'react'
import { usePaginatedLazyQuery, SearchProjectsDocument } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { ProjectCard, InfiniteList, NoResults, SearchingFor, Loader } from 'ui'

const ITEM_HEIGHT = 200

function getItemLayout(_, index) {
  return {
    index,
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
  }
}

function Projects({ query }) {
  const { navigate } = useNavigation()

  const {
    loadData,
    data,
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedLazyQuery('projects')(SearchProjectsDocument)

  useEffect(() => {
    if (query.length > 0 || (data && query.length === 0)) {
      loadData({
        variables: {
          query,
        },
      })
    }
  }, [query])

  const renderItem = ({ item }) => {
    const onPress = () =>
      navigate(SCREENS.PROJECT, {
        id: item.node.id,
        project: item.node,
      })

    return <ProjectCard project={item.node} onPress={onPress} />
  }

  return (
    <InfiniteList
      borderSeparator
      initialNumToRender={4}
      paddingBottom={40}
      getItemLayout={getItemLayout}
      ListEmptyComponent={!isFetching && query.length > 0 && <NoResults />}
      data={data}
      fetchMore={fetchMore}
      hasNextPage={isFetching ? false : hasNextPage}
      isFetching={isFetching && query.length === 0}
      isRefetching={isRefetching}
      refetch={refetch}
      renderItem={renderItem}
      defaultPadding
      ListFooterComponent={
        isFetching && !data ? <SearchingFor query={query} /> : hasNextPage && <Loader />
      }
    />
  )
}

export default memo(Projects)
