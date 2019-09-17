import React from 'react'
import { zap, zapOff } from 'images'
import { Touchable } from 'ui'
import { Wrapper, Icon } from './styles'

function FlashMode({ flashMode, onPress }) {
  return (
    <Wrapper>
      <Touchable onPress={onPress} nativeHandler>
        <Icon source={flashMode ? zap : zapOff} />
      </Touchable>
    </Wrapper>
  )
}

export default FlashMode
