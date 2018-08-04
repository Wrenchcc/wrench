import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Loader = ({ size = 'small', color = '#000', padding = 32 }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding }}>
    <ActivityIndicator size={size} color={color} />
  </View>
)

export default Loader
