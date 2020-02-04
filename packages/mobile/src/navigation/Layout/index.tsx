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
  extraContentInset = 0,
}) {
  return (
    <Provider extraContentInset={extraContentInset}>
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
