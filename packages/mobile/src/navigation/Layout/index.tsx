import React from 'react'
import Header from './Header'
import Provider from './Provider'

function Layout({
  headerComponent,
  headerTitleKey,
  headerLeft,
  headerRight,
  stickyComponent,
  children,
}) {
  return (
    <Provider>
      {headerComponent || (
        <Header
          headerLeft={headerLeft}
          headerTitleKey={headerTitleKey}
          headerRight={headerRight}
          stickyComponent={stickyComponent}
        />
      )}
      {children}
    </Provider>
  )
}

export default Layout
