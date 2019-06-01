import React from 'react'
import { Switch } from 'react-native'
import { arrowRight } from 'images'
import { COLORS } from 'ui/constants'
import Text from 'ui/Text'
import { Base, Icon } from './styles'
import Selector from './types/Selector'

const getActionType = ({ type, selected, onPress }) => {
  switch (type) {
    case 'switch':
      return (
        <Switch
          trackColor={{ true: COLORS.DARK, false: null }}
          value={selected}
          onValueChange={onPress}
        />
      )
    case 'selector':
      return <Selector selected={selected} />
    default:
      return null
  }
}

function SelectionItem({ title, hasChildren, last, ...rest }) {
  return (
    <Base onPress={rest.onPress} disabled={!rest.onPress} last={last}>
      <Text color={last && 'orange'}>{title}</Text>
      {hasChildren && <Icon source={arrowRight} />}
      {getActionType(rest)}
    </Base>
  )
}

export default SelectionItem
