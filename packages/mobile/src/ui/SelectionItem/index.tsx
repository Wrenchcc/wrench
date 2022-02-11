import React from 'react'
import { Switch } from 'react-native'
import { arrowRight } from 'images'
import { useDynamicColor } from 'utils/hooks'
import Text from 'ui/Text'
import { Base, Icon } from './styles'
import Selector from './types/Selector'

const getActionType = ({ type, selected, onPress }: Partial<SelectionItemProps>) => {
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

type SelectionItemProps = {
  title: string
  hasChildren?: boolean
  important?: boolean
  type?: string
  selected?: boolean
  onPress?: () => void
}

function SelectionItem({ title, hasChildren, important, style = {}, ...rest }: SelectionItemProps) {
  return (
    <Base onPress={rest.onPress} disabled={!rest.onPress} style={style}>
      <Text color={important && 'error'}>{title}</Text>
      {hasChildren && <Icon source={arrowRight} />}
      {getActionType(rest)}
    </Base>
  )
}

export default SelectionItem
