import React from 'react'
import { Switch } from 'react-native'
import { arrowRight } from 'images'
import { useDynamicColor } from 'utils/hooks'
import Text from 'ui/Text'
import { Base, Icon } from './styles'
import Selector from './types/Selector'

const getActionType = ({ type, selected, onPress }) => {
  const dynamicTrackColor = useDynamicColor('inverse')
  const dynamicTumbColor = useDynamicColor('default')

  switch (type) {
    case 'switch':
      return (
        <Switch
          thumbColor={dynamicTumbColor}
          trackColor={{ true: dynamicTrackColor, false: null }}
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
    <Base onPress={rest.onPress} disabled={!rest.onPress}>
      <Text color={last && 'error'}>{title}</Text>
      {hasChildren && <Icon source={arrowRight} />}
      {getActionType(rest)}
    </Base>
  )
}

export default SelectionItem
