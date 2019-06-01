import React from 'react'
import Touchable from 'ui/Touchable'
import handleParse from './handleParse'
import { Base } from './styles'

const Text = ({
  children,
  numberOfLines = 0,
  onPress,
  onLongPress,
  disabled = false,
  lineHeight = null,
  hapticFeedback = null,
  ...props
}) => onPress ? (
    <Touchable
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

export default Text
