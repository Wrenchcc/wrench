import React from 'react'
import { Switch } from 'react-native'
import PropTypes from 'prop-types'
import { arrowRight } from 'images'
import { COLORS } from 'ui/constants'
import { Base, Text, Icon } from './styles'
import Selector from './types/Selector'

const getActionType = ({ type, selected }) => {
  switch (type) {
    case 'switch':
      return <Switch onTintColor={COLORS.DARK} value={selected} />
    case 'selector':
      return <Selector selected={selected} />
    default:
      return null
  }
}

const SelectionItem = ({ title, onPress = () => {}, hasChildren, last, ...rest }) => (
  <Base onPress={onPress} disables={!onPress} last={last}>
    <Text color={last && 'orange'}>{title}</Text>
    {hasChildren && <Icon source={arrowRight} />}
    {getActionType(rest)}
  </Base>
)

SelectionItem.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  hasChildren: PropTypes.bool,
  type: PropTypes.string,
  last: PropTypes.bool,
  selected: PropTypes.bool,
  value: PropTypes.any,
}

export default SelectionItem
