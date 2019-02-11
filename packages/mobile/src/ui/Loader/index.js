import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator } from 'react-native'
import { COLORS } from 'ui/constants'

const Loader = memo(({ size = 'small', color = COLORS.DARK, padding = 32, top = 0 }) => (
  <View
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding, marginTop: top }}
  >
    <ActivityIndicator size={size} color={color} />
  </View>
))

Loader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.number,
  top: PropTypes.number,
}

export default Loader
