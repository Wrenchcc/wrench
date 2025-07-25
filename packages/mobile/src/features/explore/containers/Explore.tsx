import React, { useCallback, useEffect } from 'react'
import { AppState, View, Dimensions } from 'react-native'
import { usePaginatedLazyQuery, PostsDocument, useSimilarProjectsQuery } from '@wrench/common'
import { useReactiveVar, store } from 'gql'
import { isAndroid as _isAndroid } from 'utils/platform'
import {
  Layout,
  FlatList,
  CONTENT_INSET,
  useScrollToTop,
  withScrollableContext,
  SCREENS,
} from 'navigation'
import Header from 'navigation/Layout/Header'
import SearchBar from 'components/SearchBar'
import Search from 'components/Search'
import Post from 'components/Post'
import ProjectTypes from 'components/ProjectTypes'
import Popular from 'features/explore/components/Popular'
import ProjectsRow from 'features/project/components/SimilarProjects'
import * as Spacing from 'ui/Spacing'
import Skeleton from 'components/Post/Skeleton'

const { width } = Dimensions.get('window')

const SimilarProjects = ({ id }) => {
  const { loading, data } = useSimilarProjectsQuery({
    variables: {
      id,
    },
  })

  return (
    <View style={{ height: 290, width }}>
      {!loading && <ProjectsRow projects={data.similarProjects} marginTop={10} disableAnimation />}
    </View>
  )
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
  const searchActive = useReactiveVar(store.search.activeVar)

  useScrollToTop(SCREENS.EXPLORE, !searchActive)

  const {
    loadData,
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedLazyQuery(['posts'])(PostsDocument)

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  const handleChange = useCallback((state) => {
    if (state === 'active') {
      loadData()
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const handler = AppState.addEventListener('change', handleChange)
    return () => handler.remove()
  }, [])

  const ListEmptyComponent = isFetching && !isRefetching && <Skeleton />

  const HeaderComponent = (
    <Header headerLeft={<SearchBar />} stickyComponent={<ProjectTypes visible={!searchActive} />} />
  )

  return (
    <Layout keyboardAvoidingViewEnabled={false} headerComponent={HeaderComponent}>
      <FlatList
        spacingSeparator
        progressViewOffset={CONTENT_INSET + STICKY_HEIGHT / 2}
        initialNumToRender={2}
        ListHeaderComponent={<Popular />}
        ListEmptyComponent={ListEmptyComponent}
        extraContentInset={STICKY_HEIGHT}
        data={edges}
        refetch={handleRefetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={edges && isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />

      {searchActive && <Search />}
    </Layout>
  )
}

export default withScrollableContext(Explore, STICKY_HEIGHT)
