import React from 'react'
import { View, Platform } from 'react-native'

const STATUS_BAR_OFFSET = Platform.OS === 'ios' ? 20 : 0

export const withBackground = backgroundColor => getStory => (
  <View style={{ backgroundColor, flex: 1 }}>{getStory()}</View>
)

export const withCenter = getStory => (
  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>{getStory()}</View>
)

export const withBasePadding = getStory => (
  <View style={{ margin: 20, marginTop: 20 + STATUS_BAR_OFFSET, flex: 1 }}>{getStory()}</View>
)
