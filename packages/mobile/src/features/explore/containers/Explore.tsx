import React, { useState, useCallback, useEffect } from 'react'
import { BackHandler } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Layout, FlatList, SCREENS, currentComponentName } from 'navigation'
import { useQuery, PUBLISHERS_QUERY } from 'gql'
import { getRecentPosts } from 'graphql/queries/getExplore'
import Add from 'components/Add'
import SearchBar from 'components/SearchBar'
import Search from 'components/Search'
import Post from 'components/Post'
import Popular from 'features/explore/components/Popular'
import Publishers from '../components/Publishers'

const renderItem = ({ item }) => <Post post={item.node} />

const DEFAULT_QUERY = ''

function Explore({ posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [searchActive, setSearchActive] = useState(false)

  const { data, loading, refetch: refetchPublishers } = useQuery(PUBLISHERS_QUERY)

  const handleRefetch = useCallback(() => {
    refetch()
    refetchPublishers()
  }, [refetch, refetchPublishers])

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

  // Close on duble tap
  useEffect(() => {
    const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        if (selectedTabIndex === unselectedTabIndex && currentComponentName === SCREENS.EXPLORE) {
          setQuery(DEFAULT_QUERY)
          setSearchActive(false)
        }
      }
    )

    return () => bottomTabEventListener.remove()
  }, [])

  // Close on android hardware button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (searchActive) {
        setQuery(DEFAULT_QUERY)
        setSearchActive(false)

        return true
      }

      return false
    })

    return () => backHandler.remove()
  }, [searchActive])

  return (
    <>
      <Search query={query} active={searchActive} />
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
          ListHeaderComponent={
            <>
              {!loading && <Publishers data={data} />}
              <Popular />
            </>
          }
          data={posts}
          refetch={handleRefetch}
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
