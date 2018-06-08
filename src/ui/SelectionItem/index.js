import React from 'react'
import { Switch } from 'react-native'
import PropTypes from 'prop-types'
import { arrowRight } from 'images'
import { COLORS } from 'ui/constants'
import { Base, Text, Icon } from './styles'

const getActionType = (type, value) => {
  switch (type) {
    case 'switch':
      return <Switch onTintColor={COLORS.DARK} value={value} />
    case 'selector':
    default:
      return null
  }
}

const SelectionItem = ({ title, onPress = () => {}, hasChildren, type, value, last }) => (
  <Base onPress={onPress} disables={!onPress} last={last}>
    <Text color={last && 'orange'}>{title}</Text>
    {hasChildren && <Icon source={arrowRight} />}
    {getActionType(type, value)}
  </Base>
)

SelectionItem.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  hasChildren: PropTypes.bool,
  type: PropTypes.string,
  last: PropTypes.bool,
  value: PropTypes.any,
}

export default SelectionItem
