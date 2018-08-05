import React from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator } from 'react-native'
import { COLORS } from 'ui/constants'

const Loader = ({ size = 'small', color = COLORS.DARK, padding = 32 }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding }}>
    <ActivityIndicator size={size} color={color} />
  </View>
)

Loader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.number,
}

export default Loader
