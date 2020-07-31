import React from 'react'
import { ActivityIndicator as RNActivityIndicator } from 'react-native'
import { useDynamicColor } from 'utils/hooks'

function ActivityIndicator({ color = 'inverse' }) {
  const dynamicColor = useDynamicColor(color)

  return <RNActivityIndicator size="small" color={dynamicColor} />
}

export default ActivityIndicator
