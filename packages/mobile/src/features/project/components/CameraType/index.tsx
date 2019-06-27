import React from 'react'
import { cameraType } from 'images'
import { Button, Icon } from './styles'

function CameraType({ onPress }) {
  return (
    <Button onPress={onPress}>
      <Icon source={cameraType} />
    </Button>
  )
}

export default CameraType
