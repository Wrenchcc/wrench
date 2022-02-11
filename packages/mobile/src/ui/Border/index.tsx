import React from 'react'
import { View } from 'react-native'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    borderBottomColor: PlatformColor.divider,
    borderBottomWidth: 1,
  },
}

const Border = ({ style = {} }) => <View style={[styles.base, style]} />

export default Border
