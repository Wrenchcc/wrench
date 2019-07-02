import React from 'react'
import Add from 'components/Add'
import Header from './Header'
import Provider from './Provider'

function Layout({ headerTitleKey, headerLeft, headerRight = <Add />, stickyComponent, children }) {
  return (
    <Provider>
      <Header
        headerLeft={headerLeft}
        headerTitleKey={headerTitleKey}
        headerRight={headerRight}
        stickyComponent={stickyComponent}
      />
      {children}
    </Provider>
  )
}

export default Layout
