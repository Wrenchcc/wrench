import React from 'react'
import PropTypes from 'prop-types'
import hitSlop from 'utils/hitSlop'
import { Touchable } from 'ui'
import handleParse from './handleParse'
import { Base } from './styles'

const Text = ({
  children,
  numberOfLines = 0,
  onPress,
  disabled = false,
  lineHeight = null,
  ...props
}) =>
  onPress ? (
    <Touchable hitSlop={hitSlop(10)} onPress={onPress} disabled={disabled}>
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
  numberOfLines: PropTypes.number,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  lineHeight: PropTypes.number,
}

export default Text
