import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export default function useKeyboard() {
  const [keyboard, setKeyboard] = useState({
    Keyboard,
    isKeyboardShow: false,
    endCoordinates: 0,
    keyboardHeight: 0,
    startCoordinates: 0,
  })

  function keyboardShown(e) {
    setKeyboard({
      endCoordinates: e.endCoordinates,
      keyboardHeight: e.endCoordinates.height,
      isKeyboardShow: true,
      Keyboard,
      startCoordinates: e.startCoordinates,
    })
  }

  function keyboardHidden(e) {
    setKeyboard({
      endCoordinates: e.endCoordinates,
      keyboardHeight: 0,
      isKeyboardShow: false,
      Keyboard,
      startCoordinates: e.startCoordinates,
    })
  }

  useEffect(() => {
    // keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', keyboardHidden)
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardShown)
    // keyboardDidShowListener = Keyboard.addListener('keyboardWillHide', keyboardShown)
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardHidden)

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return keyboard
}
