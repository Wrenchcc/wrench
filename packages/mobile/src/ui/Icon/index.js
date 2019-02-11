import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import Touchable from 'ui/Touchable'

const Icon = memo(({ onPress = () => {}, source, opacity = 1, ...rest }) => (
    <Touchable onPress={onPress} {...rest}>
      <Image source={source} style={{ opacity }} />
    </Touchable>
))

Icon.propTypes = {
  opacity: PropTypes.number,
  onPress: PropTypes.func,
  source: PropTypes.any.isRequired,
}

export default Icon
