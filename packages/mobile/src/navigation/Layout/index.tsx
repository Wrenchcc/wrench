import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Search from 'components/Search'
import Header from '../Header'
import Provider from './Provider'

const DEFAULT_QUERY = ''

function Layout({ actions, search, headerTitle, children }) {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [isActive, setActive] = useState(false)

  const handleSearchCancel = () => {
    setQuery(DEFAULT_QUERY)
    setActive(false)
  }

  return (
    <Provider>
      <Header
        actions={actions}
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

Layout.propTypes = {
  headerTitle: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.node,
      icon: PropTypes.node,
      onPress: PropTypes.func,
      testId: PropTypes.object,
    })
  ),
  search: PropTypes.object,
  renderSearch: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export default Layout
