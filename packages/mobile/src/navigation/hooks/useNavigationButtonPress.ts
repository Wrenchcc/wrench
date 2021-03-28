import { useLayoutEffect } from 'react'
import { Navigation, NavigationButtonPressedEvent } from 'react-native-navigation'

export default function useNavigationButtonPress(
  handler: (event: NavigationButtonPressedEvent) => void,
  componentId?: string,
  buttonId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener((event) => {
      const equalComponentId = event.componentId === componentId
      const equalButtonId = event.buttonId === buttonId

      if ((componentId && !equalComponentId) || (buttonId && !equalButtonId)) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, componentId, buttonId])
}
