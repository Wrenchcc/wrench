import { useEffect, useRef, useState } from 'react'
import { Keyboard } from 'react-native'
import { isAndroid } from 'utils/platform'

const KEYBOARD_SHOW_EVENT = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'
const KEYBOARD_HIDE_EVENT = 'keyboardWillHide'

const useKeyboardListener = () => {
  const keyboardDidShowListener = useRef()
  const keyboardDidHideListener = useRef()
  const [open, setOpen] = useState(false)

  const toggleKeyboardState = () => setOpen(!open)

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(KEYBOARD_SHOW_EVENT, toggleKeyboardState)
    keyboardDidHideListener.current = Keyboard.addListener(KEYBOARD_HIDE_EVENT, toggleKeyboardState)
    return () => {
      keyboardDidShowListener.current.remove()
      keyboardDidHideListener.current.remove()
    }
  }, [keyboardDidShowListener, keyboardDidHideListener])

  return {
    keyboardWillHide: open,
    keyboardWillShow: open,
  }
}

export default useKeyboardListener
