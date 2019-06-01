import React from 'react'
import Text from 'ui/Text'
import { arrowDown, arrowUpGrey, arrowDownGrey } from 'images'
import { Base, Icon } from './styles'

function Dropdown({ active, onPress, title, darkMode = false }) {
  let icon

  if (active) {
    icon = arrowUpGrey
  } else if (darkMode) {
    icon = arrowDownGrey
  } else {
    icon = arrowDown
  }

  return (
    <Base onPress={onPress} hapticFeedback="impactLight">
      <Text
        color={(darkMode && 'dark') || active ? 'dark' : 'white'}
        medium
        style={{ zIndex: 100 }}
        numberOfLines={1}
      >
        {title}
      </Text>
      <Icon source={icon} />
    </Base>
  )
}

export default Dropdown
