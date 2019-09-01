import React from 'react'
import { cameraType } from 'images'
import { Touchable } from 'ui'

import { Wrapper, Icon } from './styles'

function CameraType({ onPress }) {
  return (
    <Wrapper>
      <Touchable onPress={onPress} nativeHandler>
        <Icon source={cameraType} />
      </Touchable>
    </Wrapper>
  )
}

export default CameraType
