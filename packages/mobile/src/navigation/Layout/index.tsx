import React from 'react'
import Header from './Header'

function Layout({ headerTitleKey, headerLeft, headerRight, stickyComponent, children }) {
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
