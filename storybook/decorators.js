import React from 'react'
import { View, Platform } from 'react-native'
import Header from 'ui/Header'

const STATUS_BAR_OFFSET = Platform.OS === 'ios' ? 20 : 0

export const withNavigation = getStory => (
  <View style={{ flex: 1 }}>
    <Header />
    {getStory()}
  </View>
)

export const withBasePadding = getStory => (
  <View style={{ margin: 20, marginTop: 20 + STATUS_BAR_OFFSET, flex: 1 }}>{getStory()}</View>
)
