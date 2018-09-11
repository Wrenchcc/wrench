import React from 'react'
import PropTypes from 'prop-types'
import hitSlop from 'utils/hitSlop'
import Touchable from 'ui/Touchable'
import { Base } from './styles'

const Title = ({
  children,
  numberOfLines = 2,
  style = {},
  large,
  medium,
  onPress,
  onLongPress,
  disabled = false,
  ...props
}) => onPress ? (
    <Touchable
      hitSlop={hitSlop(10)}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
    >
      <Base numberOfLines={numberOfLines} medium={medium} large={large} style={style} {...props}>
        {children}
      </Base>
    </Touchable>
) : (
    <Base numberOfLines={numberOfLines} medium={medium} large={large} style={style} {...props}>
      {children}
    </Base>
)

Title.propTypes = {
  children: PropTypes.any,
  numberOfLines: PropTypes.number,
  style: PropTypes.any,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Title
