import React from 'react'
import { zap, zapOff } from 'images'
import { Button, Icon } from './styles'

function FlashMode({ flashMode, onPress }) {
  return (
    <Button onPress={onPress} hapticFeedback="impactLight">
      <Icon source={flashMode ? zap : zapOff} />
    </Button>
  )
}

export default FlashMode
