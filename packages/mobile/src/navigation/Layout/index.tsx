import React, { useState, useCallback } from 'react'
import Search from 'components/Search'
import Add from 'components/Add'
import Header from './Header'
import Provider from './Provider'

const DEFAULT_QUERY = ''

function Layout({ headerLeft, headerRight = <Add />, search = true, stickyComponent, children }) {
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
    <Provider>
      <Header
        headerLeft={headerLeft}
        headerRight={headerRight}
        onQueryChange={handleQueryChange}
        query={query}
        search={search}
        onSearchFocus={handleSearchFocus}
        onSearchCancel={handleSearchCancel}
        onSearchClear={handleSearchClear}
        searchActive={searchActive}
        stickyComponent={stickyComponent}
      />
      {searchActive && <Search query={query} />}
      {children}
    </Provider>
  )
}

export default Layout
