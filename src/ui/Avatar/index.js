import React from 'react'
import PropTypes from 'prop-types'
import hitSlop from 'utils/hitSlop'
import { Touchable, Image } from 'ui'

const Avatar = ({ uri, size = 30, onPress, disabled = false, style = {} }) =>
  onPress ? (
    <Touchable hitSlop={hitSlop(10)} onPress={onPress} style={style} disabled={disabled}>
      <Image source={{ uri }} width={size} height={size} borderRadius={size / 2} />
    </Touchable>
  ) : (
    <Image source={{ uri }} width={size} height={size} style={style} borderRadius={size / 2} />
  )

Avatar.propTypes = {
  uri: PropTypes.string.isRequired,
  size: PropTypes.number,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.any,
}

export default Avatar
