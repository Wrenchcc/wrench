import React, { useState, useCallback } from 'react'
import { Layout, FlatList } from 'navigation'
import { getRecentPosts } from 'graphql/queries/getExplore'
import Add from 'components/Add'
import SearchBar from 'components/SearchBar'
import Search from 'components/Search'
import Post from 'components/Post'
import Popular from 'features/explore/components/Popular'

const renderItem = ({ item }) => <Post post={item.node} />

const DEFAULT_QUERY = ''

function Explore({ posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [searchActive, setSearchActive] = useState(false)

  const handleQueryChange = useCallback(
    text => {
      setQuery(text)
    },
    [setQuery]
  )

  const handleSearchCancel = useCallback(() => {
    setQuery(DEFAULT_QUERY)
    setSearchActive(false)
  }, [])

  const handleSearchFocus = useCallback(() => setSearchActive(true), [setSearchActive])
  const handleSearchClear = useCallback(() => setQuery(DEFAULT_QUERY), [setQuery])

  return (
    <>
      {searchActive && <Search query={query} />}
      <Layout
        headerRight={searchActive || <Add />}
        headerLeft={
          <SearchBar
            onChangeQuery={handleQueryChange}
            query={query}
            onSearchFocus={handleSearchFocus}
            onSearchCancel={handleSearchCancel}
            onSearchClear={handleSearchClear}
            searchActive={searchActive}
          />
        }
      >
        <FlatList
          tabIndex={1}
          spacingSeparator
          initialNumToRender={2}
          ListHeaderComponent={<Popular />}
          data={posts}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          renderItem={renderItem}
        />
      </Layout>
    </>
  )
}

export default getRecentPosts(Explore)
