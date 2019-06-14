import { useEffect, useRef, useState } from 'react'
import { Keyboard } from 'react-native'

const useKeyboardListener = () => {
  const keyboardDidShowListener = useRef()
  const keyboardDidHideListener = useRef()
  const [open, setOpen] = useState(false)
  const toggleKeyboardState = () => setOpen(!open)

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', toggleKeyboardState)
    keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', toggleKeyboardState)
    return () => {
      keyboardDidShowListener.current.remove()
      keyboardDidHideListener.current.remove()
    }
  }, [])

  return open
}

export default useKeyboardListener
