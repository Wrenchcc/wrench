import React from 'react'
import { View } from 'react-native'
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet'
import PlatformColor from 'ui/PlatformColor'

const CustomBackground = ({ style }: BottomSheetBackgroundProps) => {
  return <View style={[{ backgroundColor: PlatformColor.default }, style]} />
}

export default CustomBackground
