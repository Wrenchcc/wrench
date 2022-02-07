import React from 'react'
import { KeyboardAvoidingView } from 'ui'
import Header from './Header'

function Layout({
  headerComponent,
  headerTitleKey,
  headerLeft,
  headerRight,
  stickyComponent,
  children,
}) {
  return (
    // TODO: Only enable when last item in list
    <KeyboardAvoidingView paddingHorizontal={0}>
      {headerComponent || (
        <Header
          headerLeft={headerLeft}
          headerTitleKey={headerTitleKey}
          headerRight={headerRight}
          stickyComponent={stickyComponent}
        />
      )}
      {children}
    </KeyboardAvoidingView>
  )
}

export default Layout
