import React from 'react'
import { useColorScheme, View } from 'react-native'
import { Skeleton as BaseSkeleton } from 'moti/skeleton'

export default function Skeleton({ style = {}, ...props }) {
  const colorMode = useColorScheme()

  return (
    <View style={style}>
      <BaseSkeleton colorMode={colorMode} {...props} />
    </View>
  )
}
