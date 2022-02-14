import React from 'react'
import { Switch, Image } from 'react-native'
import { arrowRight } from 'images'
import PlatformColor from 'ui/PlatformColor'
import Touchable from 'ui/Touchable'
import Text from 'ui/Text'
import Selector from './types/Selector'

const styles = {
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 6,
    height: 11,
  },
}

const getActionType = ({ type, selected, onPress }: Partial<SelectionItemProps>) => {
  switch (type) {
    case 'switch':
      return (
        <Switch
          thumbColor={PlatformColor.default}
          trackColor={{ true: PlatformColor.inverse, false: null }}
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
    <Touchable onPress={rest.onPress} disabled={!rest.onPress} style={[styles.base, style]}>
      <Text color={important && 'error'}>{title}</Text>
      {hasChildren && <Image source={arrowRight} style={styles.icon} />}
      {getActionType(rest)}
    </Touchable>
  )
}

export default SelectionItem
