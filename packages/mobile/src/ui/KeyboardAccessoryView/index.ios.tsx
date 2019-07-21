import React, { useRef, useEffect, useState } from 'react'
import { View, Keyboard } from 'react-native'
import { Transitioning, Transition } from 'react-native-reanimated'
import { hasNotch } from 'utils/platform'

const SPACING = hasNotch ? 20 : 0
const INPUT_HEIGHT = 60

const transition = <Transition.Change interpolation="easeInOut" />

function KeyboardAccessoryView({ children, extraHeight = 0 }) {
  const ref = useRef()
  const [keyboardHeight, setKeyboardHeight] = useState(INPUT_HEIGHT + extraHeight)

  useEffect(() => {
    const keyboardShowEventListener = Keyboard.addListener(
      'keyboardWillShow',
      ({ endCoordinates }) => {
        ref.current.animateNextTransition()
        setKeyboardHeight(endCoordinates.height + extraHeight - SPACING)
      }
    )

    const keyboardHideEventListener = Keyboard.addListener('keyboardWillHide', () => {
      ref.current.animateNextTransition()
      setKeyboardHeight(INPUT_HEIGHT + extraHeight)
    })

    return () => {
      keyboardShowEventListener.remove()
      keyboardHideEventListener.remove()
    }
  }, [])

  return (
    <Transitioning.View ref={ref} transition={transition}>
      <View
        style={{
          backgroundColor: 'white',
          bottom: 0,
          height: keyboardHeight,
          left: 0,
          overflow: 'hidden',
          position: 'absolute',
          right: 0,
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 20 }}>{children}</View>
      </View>
    </Transitioning.View>
  )
}

export default KeyboardAccessoryView
