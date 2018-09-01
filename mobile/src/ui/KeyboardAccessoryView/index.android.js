import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

const KeyboardAccessoryView = ({ children, style = {} }) => <View style={style}>{children}</View>

KeyboardAccessoryView.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
}

export default KeyboardAccessoryView
