import React from 'react'
import { ActivityIndicator as RNActivityIndicator } from 'react-native'
import PlatformColor from 'ui/PlatformColor'

function ActivityIndicator({ color = 'inverse', size = 'small' }) {
  return <RNActivityIndicator size={size} color={PlatformColor[color]} />
}

export default ActivityIndicator
