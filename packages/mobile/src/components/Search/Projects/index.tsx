import React from 'react'
import { useNavigation, SCREENS } from 'navigation'
import { searchProjects } from 'graphql/queries/project/searchProjects'
import { ProjectCard, InfiniteList, NoResults, SearchingFor, Loader } from 'ui'

const ITEM_HEIGHT = 200

function getItemLayout(_, index) {
  return {
    index,
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
  }
}

function Projects({ fetchMore, hasNextPage, isFetching, isRefetching, projects, refetch, query }) {
  const { navigate } = useNavigation()

  return (
    <InfiniteList
      borderSeparator
      initialNumToRender={4}
      paddingBottom={40}
      getItemLayout={getItemLayout}
      ListEmptyComponent={!isFetching && <NoResults />}
      data={projects}
      fetchMore={fetchMore}
      hasNextPage={isFetching ? false : hasNextPage}
      isFetching={isFetching && query.length === 0}
      isRefetching={isRefetching}
      refetch={refetch}
      renderItem={({ item }) => (
        <ProjectCard
          project={item.node}
          onPress={() => navigate(SCREENS.PROJECT, { slug: item.node.slug })}
        />
      )}
      defaultPadding
      ListFooterComponent={
        (query.length === 1 && !projects) || (isFetching && query.length !== 0) ? (
          <SearchingFor query={query} />
        ) : (
          hasNextPage && <Loader />
        )
      }
    />
  )
}

export default searchProjects(Projects)
