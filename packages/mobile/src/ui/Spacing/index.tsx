import React from 'react'
import { View } from 'react-native'

export function Vertically({ px = 0 }) {
  return <View style={{ marginRight: px }} />
}

export function Horizontally({ px = 0 }) {
  return <View style={{ marginTop: px }} />
}
