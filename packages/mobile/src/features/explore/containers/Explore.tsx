import React, { useState, useCallback, useEffect, useRef } from 'react'
import { BackHandler } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { usePaginatedQuery, PostsDocument } from '@wrench/common'
import { isAndroid as _isAndroid } from 'utils/platform'
import { Layout, FlatList, SCREENS, currentComponentName, useScrollToTop } from 'navigation'
import Header from 'navigation/Layout/Header'
import SearchBar from 'components/SearchBar'
import Search from 'components/Search'
import Post from 'components/Post'
import ProjectTypes from 'components/ProjectTypes'
import Popular from 'features/explore/components/Popular'

const renderItem = ({ item }) => <Post post={item.node} />

const DEFAULT_QUERY = ''
const STICKY_HEIGHT = 50

function Explore() {
  const scrollRef = useRef()
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [searchActive, setSearchActive] = useState(false)

  useScrollToTop(scrollRef, SCREENS.EXPLORE)

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
    <Layout
      extraContentInset={STICKY_HEIGHT}
      headerComponent={
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
          stickyComponent={!searchActive && <ProjectTypes />}
        />
      }
    >
      {searchActive && <Search query={query} />}

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
    </Layout>
  )
}

export default Explore
