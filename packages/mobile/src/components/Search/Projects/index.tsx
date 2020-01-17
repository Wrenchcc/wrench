import React, { memo } from 'react'
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
  const isFetching = false
  const data = null
  const fetchMore = () => {}
  const refetch = () => {}
  const hasNextPage = false
  const isRefetching = false

  const renderItem = ({ item }) => {
    const onPress = () =>
      navigate(SCREENS.PROJECT, {
        ...item.node,
      })

    return <ProjectCard project={item.node} onPress={onPress} />
  }

  return (
    <InfiniteList
      borderSeparator
      initialNumToRender={4}
      paddingBottom={40}
      getItemLayout={getItemLayout}
      ListEmptyComponent={!isFetching && <NoResults />}
      data={data}
      fetchMore={fetchMore}
      hasNextPage={isFetching ? false : hasNextPage}
      isFetching={isFetching && query.length === 0}
      isRefetching={isRefetching}
      refetch={refetch}
      renderItem={renderItem}
      defaultPadding
      ListFooterComponent={
        (query.length === 1 && !data) || (isFetching && query.length !== 0) ? (
          <SearchingFor query={query} />
        ) : (
          hasNextPage && <Loader />
        )
      }
    />
  )
}

export default memo(Projects)
