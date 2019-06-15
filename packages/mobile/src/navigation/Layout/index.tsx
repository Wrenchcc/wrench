import React, { useState, useCallback } from 'react'
import Search from 'components/Search'
import Add from 'components/Add'
import Header from './Header'
import Provider from './Provider'

const DEFAULT_QUERY = ''

function Layout({ headerLeft, headerRight = <Add />, search = true, stickyComponent, children }) {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [isActive, setActive] = useState(false)

  const handleQueryChange = useCallback(
    text => {
      setQuery(text)
    },
    [setQuery]
  )

  const handleSearchCancel = useCallback(() => {
    setQuery(DEFAULT_QUERY)
    setActive(false)
  }, [])

  const handleSearchFocus = useCallback(() => setActive(true), [setActive])
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
        searchActive={isActive}
        stickyComponent={stickyComponent}
      />
      <Search active={isActive} query={query} />
      {children}
    </Provider>
  )
}

export default Layout
