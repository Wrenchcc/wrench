import React from 'react'
import Add from 'components/Add'
import Header from './Header'

function Layout({ headerTitleKey, headerLeft, headerRight = <Add />, stickyComponent, children }) {
  return (
    <>
      <Header
        headerLeft={headerLeft}
        headerTitleKey={headerTitleKey}
        headerRight={headerRight}
        stickyComponent={stickyComponent}
      />
      {children}
    </>
  )
}

export default Layout
