import React from 'react'
import PropTypes from 'prop-types'
import { Base, Left, Center, Right } from './styles'

export const Header = ({ headerLeft, headerCenter, headerRight, transparent = true }) => (
  <Base transparent={transparent}>
    <Left>{headerLeft}</Left>
    <Center>{headerCenter && headerCenter}</Center>
    <Right>{headerRight}</Right>
  </Base>
)

Header.propTypes = {
  transparent: PropTypes.bool,
  headerLeft: PropTypes.any,
  headerCenter: PropTypes.any,
  headerRight: PropTypes.any,
}

export default Header
