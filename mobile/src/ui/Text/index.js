import React from 'react'
import PropTypes from 'prop-types'
import hitSlop from 'utils/hitSlop'
import Touchable from 'ui/Touchable'
import handleParse from './handleParse'
import { Base } from './styles'

const Text = ({
  children,
  numberOfLines = 0,
  onPress,
  onLongPress,
  disabled = false,
  lineHeight = 0,
  hapticFeedback = null,
  ...props
}) => onPress ? (
    <Touchable
      hitSlop={hitSlop(10)}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      hapticFeedback={hapticFeedback}
    >
      <Base
        numberOfLines={numberOfLines}
        {...props}
        parse={handleParse}
        childrenProps={{ style: { lineHeight } }}
      >
        {children}
      </Base>
    </Touchable>
) : (
    <Base
      numberOfLines={numberOfLines}
      {...props}
      parse={handleParse}
      childrenProps={{ style: { lineHeight } }}
    >
      {children}
    </Base>
)

Text.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  hapticFeedback: PropTypes.string,
  lineHeight: PropTypes.number,
  numberOfLines: PropTypes.number,
  onLongPress: PropTypes.func,
  onPress: PropTypes.func,
}

export default Text
