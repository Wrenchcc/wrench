import React from 'react'
import PropTypes from 'prop-types'
import hitSlop from 'utils/hitSlop'
import { Base, Touchable } from './styles'

const HeaderTitle = ({ onPress, children, opacity = 1 }) => (
  <Touchable hitSlop={hitSlop(10)} disabled={!onPress} onPress={onPress}>
    <Base numberOfLines={1} style={{ opacity }}>
      {children}
    </Base>
  </Touchable>
)

HeaderTitle.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  opacity: PropTypes.number,
}

export default HeaderTitle
