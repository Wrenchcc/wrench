import React, { useState, useCallback } from 'react'
import Search from 'components/Search'
import Add from 'components/Add'
import Header from './Header'
import Provider from './Provider'

const DEFAULT_QUERY = ''

function Layout({ headerLeft, headerRight = <Add />, search = true, headerTitle, children }) {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [isActive, setActive] = useState(false)

  const handleSearchCancel = useCallback(() => {
    setQuery(DEFAULT_QUERY)
    setActive(false)
  }, [])

  return (
    <Provider>
      <Header
        headerLeft={headerLeft}
        headerRight={headerRight}
        onQueryChange={setQuery}
        headerTitle={headerTitle}
        query={query}
        search={search}
        onSearchFocus={() => setActive(true)}
        onSearchCancel={handleSearchCancel}
        onSearchClear={() => setQuery(DEFAULT_QUERY)}
        searchActive={isActive}
      />
      <Search active={isActive} query={query} />
      {children}
    </Provider>
  )
}

export default Layout
