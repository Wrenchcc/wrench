import React, { useRef, useEffect, useState } from 'react'
import { SafeAreaView, View, Keyboard } from 'react-native'
import { Transitioning, Transition } from 'react-native-reanimated'
import { hasNotch } from 'utils/platform'

const SPACING = hasNotch ? 30 : 0
const INPUT_HEIGHT = 60

const transition = <Transition.Change interpolation="easeInOut" />

function KeyboardAccessoryView({ children }) {
  const ref = useRef()
  const [keyboardHeight, setKeyboardHeight] = useState(INPUT_HEIGHT + SPACING)

  useEffect(() => {
    const keyboardShowEventListener = Keyboard.addListener(
      'keyboardWillShow',
      ({ endCoordinates }) => {
        ref.current.animateNextTransition()
        setKeyboardHeight(endCoordinates.height + INPUT_HEIGHT)
      }
    )

    const keyboardHideEventListener = Keyboard.addListener('keyboardWillHide', () => {
      ref.current.animateNextTransition()
      setKeyboardHeight(INPUT_HEIGHT + SPACING)
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
          position: 'absolute',
          height: keyboardHeight,
          overflow: 'hidden',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
        }}
      >
        <View style={{ flex: 1, paddingRight: 20, paddingLeft: 20 }}>{children}</View>
      </View>
    </Transitioning.View>
  )
}

export default KeyboardAccessoryView
