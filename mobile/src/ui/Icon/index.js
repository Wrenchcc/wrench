import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { Touchable } from 'ui'

function Icon({ onPress = () => {}, source, opacity = 1, ...rest }) {
  return (
    <Touchable onPress={onPress} {...rest}>
      <Image source={source} style={{ opacity }} />
    </Touchable>
  )
}

Icon.propTypes = {
  opacity: PropTypes.number,
  onPress: PropTypes.func,
  source: PropTypes.any.isRequired,
}

export default Icon
