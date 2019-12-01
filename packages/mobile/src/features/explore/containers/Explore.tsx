import React, { useState, useCallback, useEffect } from 'react'
import { BackHandler } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { FlatList, SCREENS, currentComponentName } from 'navigation'
import Header from 'navigation/Layout/Header'
import { getRecentPosts } from 'graphql/queries/getExplore'
import Add from 'components/Add'
import SearchBar from 'components/SearchBar'
import Search from 'components/Search'
import Post from 'components/Post'
import ProjectTypes from 'components/ProjectTypes'
import Popular from 'features/explore/components/Popular'

const renderItem = ({ item }) => <Post post={item.node} />

const DEFAULT_QUERY = ''

function Explore({ posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [searchActive, setSearchActive] = useState(false)

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

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

      <Header
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
        headerRight={searchActive || <Add />}
        stickyComponent={!searchActive && <ProjectTypes />}
      />

      <FlatList
        extraContentInset={50}
        tabIndex={1}
        spacingSeparator
        initialNumToRender={2}
        ListHeaderComponent={<Popular />}
        data={posts}
        refetch={handleRefetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </>
  )
}

export default getRecentPosts(Explore)
