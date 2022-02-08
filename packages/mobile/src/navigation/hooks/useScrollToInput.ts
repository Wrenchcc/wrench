import { useEffect } from 'react'
import { Keyboard, findNodeHandle, TextInput, UIManager } from 'react-native'
import { isAndroid } from 'utils/platform'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'
const KEYBOARD_OFFSET = 10

function useScrollToInput(ref) {
  useEffect(() => {
    const keyboardEventListener = Keyboard.addListener(KEYBOARD_EVENT_LISTENER, () => {
      const currentlyFocusedInput = findNodeHandle(TextInput.State.currentlyFocusedInput())
      const scrollResponder = ref?.current?.getScrollResponder()

      if (!scrollResponder || !currentlyFocusedInput) {
        return
      }

      UIManager.viewIsDescendantOf(
        currentlyFocusedInput,
        scrollResponder.getInnerViewNode(),
        (isAncestor) => {
          if (isAncestor) {
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
              currentlyFocusedInput,
              KEYBOARD_OFFSET
            )
          }
        }
      )
    })

    return () => keyboardEventListener.remove()
  }, [ref])
}

export default useScrollToInput
