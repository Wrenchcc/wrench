import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Base, Left, Center, Right } from './styles'

const Header = memo(({ headerLeft, headerCenter, headerRight, transparent = true }) => (
    <Base transparent={transparent}>
      <Left>{headerLeft}</Left>
      <Center>{headerCenter && headerCenter}</Center>
      <Right>{headerRight || null}</Right>
    </Base>
))

Header.propTypes = {
  transparent: PropTypes.bool,
  headerLeft: PropTypes.any,
  headerCenter: PropTypes.any,
  headerRight: PropTypes.any,
}

export default Header
