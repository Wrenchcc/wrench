import React, { useCallback, useRef } from 'react'
import { usePaginatedQuery, PostsDocument, useSimilarProjectsQuery } from '@wrench/common'
import { useReactiveVar, store } from 'gql'
import { isAndroid as _isAndroid } from 'utils/platform'
import { Layout, FlatList, SCREENS, useScrollToTop } from 'navigation'
import Header from 'navigation/Layout/Header'
import SearchBar from 'components/SearchBar'
import Search from 'components/Search'
import Post from 'components/Post'
import ProjectTypes from 'components/ProjectTypes'
import Popular from 'features/explore/components/Popular'
import ProjectsRow from 'features/project/components/SimilarProjects'
import * as Spacing from 'ui/Spacing'

const SimilarProjects = ({ id }) => {
  const { loading, data } = useSimilarProjectsQuery({
    variables: {
      id,
    },
  })

  if (loading) {
    return null
  }
  return <ProjectsRow projects={data.similarProjects} marginTop={10} disableAnimation />
}

const renderItem = ({ item, index }) => {
  if (index > 5 && index % 10 === 0) {
    return (
      <>
        <Post post={item.node} paddingBottom={0} />
        <SimilarProjects id={item.node?.project?.id} />
        <Spacing.Horizontally px={50} />
      </>
    )
  }

  return <Post post={item.node} />
}

const STICKY_HEIGHT = 50

function Explore() {
  const scrollRef = useRef(null)
  const searchActive = useReactiveVar(store.search.activeVar)

  useScrollToTop(scrollRef, SCREENS.EXPLORE, !searchActive)

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['posts'])(PostsDocument)

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  return (
    <Layout
      extraContentInset={STICKY_HEIGHT}
      headerComponent={
        <Header
          headerLeft={<SearchBar />}
          stickyComponent={<ProjectTypes visible={!searchActive} />}
        />
      }
    >
      <FlatList
        ref={scrollRef}
        spacingSeparator
        initialNumToRender={2}
        ListHeaderComponent={<Popular />}
        extraContentInset={STICKY_HEIGHT}
        data={edges}
        refetch={handleRefetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />

      {searchActive && <Search />}
    </Layout>
  )
}

export default Explore
