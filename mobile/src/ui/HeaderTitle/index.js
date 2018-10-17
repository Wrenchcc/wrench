import React from 'react'
import PropTypes from 'prop-types'
import hitSlop from 'utils/hitSlop'
import { Base, Touchable } from './styles'

function HeaderTitle({ onPress = () => {}, children, opacity = 1 }) {
  return (
    <Touchable hitSlop={hitSlop(10)} disabled={!onPress} onPress={onPress}>
      <Base numberOfLines={1} style={{ opacity }}>
        {children}
      </Base>
    </Touchable>
  )
}

HeaderTitle.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.any.isRequired,
  opacity: PropTypes.object,
}

export default HeaderTitle
