import React from 'react'
import { KeyboardAvoidingView } from 'ui'
import { withScrollableContext } from '../scrollables'
import Header from './Header'

function Page({
  children,
  headerTitle,
  headerSubTitle,
  headerRight,
  headerLeft,
  disableAnimation,
  keyboardVerticalOffset = 0,
  paddingHorizontal = 0,
}) {
  return (
    <KeyboardAvoidingView
      paddingHorizontal={paddingHorizontal}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <Header
        headerTitle={headerTitle}
        headerSubTitle={headerSubTitle}
        headerLeft={headerLeft}
        headerRight={headerRight}
        disableAnimation={disableAnimation}
      />
      {children}
    </KeyboardAvoidingView>
  )
}

export default withScrollableContext(Page)
