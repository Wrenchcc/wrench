import React, { useCallback, useRef } from 'react'
import { usePaginatedQuery, PostsDocument } from '@wrench/common'
import { useReactiveVar, store } from 'gql'
import { isAndroid as _isAndroid } from 'utils/platform'
import { Layout, FlatList, SCREENS, useScrollToTop } from 'navigation'
import Header from 'navigation/Layout/Header'
import SearchBar from 'components/SearchBar'
import Search from 'components/Search'
import Post from 'components/Post'
import ProjectTypes from 'components/ProjectTypes'
import Popular from 'features/explore/components/Popular'

const renderItem = ({ item }) => <Post post={item.node} />

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
