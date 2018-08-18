import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'ui'
import { arrowDown, arrowUpGrey } from 'images'
import { Base, Icon } from './styles'

const Dropdown = ({ active, onPress, title }) => (
  <Base onPress={onPress} hapticFeedback="impactLight">
    <Text color={active ? 'dark' : 'white'} medium style={{ zIndex: 100 }} numberOfLines={1}>
      {title}
    </Text>
    <Icon source={active ? arrowUpGrey : arrowDown} />
  </Base>
)

Dropdown.propTypes = {
  active: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default Dropdown
