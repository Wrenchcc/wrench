import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { Touchable } from 'ui'

function Icon({ onPress, source }) {
  return (
    <Touchable onPress={onPress}>
      <Image source={source} />
    </Touchable>
  )
}

Icon.propTypes = {
  onPress: PropTypes.func.isRequired,
  source: PropTypes.any.isRequired,
}

export default Icon
