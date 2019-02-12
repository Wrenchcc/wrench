import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Base, Touchable } from './styles'

const HeaderTitle = memo(function HeaderTitle({ onPress = () => {}, children, opacity = 1 }) {
  return (
    <Touchable disabled={!onPress} onPress={onPress}>
      <Base numberOfLines={1} style={{ opacity }}>
        {children}
      </Base>
    </Touchable>
  )
})

HeaderTitle.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.any.isRequired,
  opacity: PropTypes.object,
}

export default HeaderTitle
