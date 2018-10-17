import React from 'react'
import PropTypes from 'prop-types'
import { Base, Left, Center, Right } from './styles'

function Header({ headerLeft, headerCenter, headerRight, transparent = true }) {
  return (
    <Base transparent={transparent}>
      <Left>{headerLeft}</Left>
      <Center>{headerCenter && headerCenter}</Center>
      <Right>{headerRight}</Right>
    </Base>
  )
}

Header.propTypes = {
  transparent: PropTypes.bool,
  headerLeft: PropTypes.any,
  headerCenter: PropTypes.any,
  headerRight: PropTypes.any,
}

export default Header
