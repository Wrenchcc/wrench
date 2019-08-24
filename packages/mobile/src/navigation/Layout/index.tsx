import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import Add from 'components/Add'
import { isIphone } from 'utils/platform'
import Header from './Header'
import Provider from './Provider'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

function Layout({
  headerTitleKey,
  headerLeft,
  headerRight = <Add />,
  stickyComponent,
  children,
  keyboardAvoidingViewEnabled,
}) {
  return (
    <KeyboardAvoidingView
      behavior={KEYBOARD_BEHAVIOR}
      style={{ flex: 1 }}
      enabled={keyboardAvoidingViewEnabled}
    >
      <Provider>
        <Header
          headerLeft={headerLeft}
          headerTitleKey={headerTitleKey}
          headerRight={headerRight}
          stickyComponent={stickyComponent}
        />
        {children}
      </Provider>
    </KeyboardAvoidingView>
  )
}

export default Layout
