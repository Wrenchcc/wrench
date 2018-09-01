import React from 'react'
import { View } from 'react-native'
import { COLORS } from 'ui/constants'

const Badge = () => (
  <View
    style={{
      zIndex: 10,
      marginRight: -12,
      marginBottom: -8,
      width: 13,
      height: 13,
      borderRadius: 13,
      backgroundColor: COLORS.ORANGE,
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: COLORS.BLACK,
    }}
  />
)

export default Badge
