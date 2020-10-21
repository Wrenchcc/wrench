import React from 'react'
import { ActivityIndicator as RNActivityIndicator } from 'react-native'
import { useDynamicColor } from 'utils/hooks'

function ActivityIndicator({ color = 'inverse', size = 'small' }) {
  const dynamicColor = useDynamicColor(color)

  return <RNActivityIndicator size={size} color={dynamicColor} />
}

export default ActivityIndicator
