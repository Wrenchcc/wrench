import { useLayoutEffect } from 'react'
import { Navigation, ComponentDidDisappearEvent } from 'react-native-navigation'

export default function useNavigationComponentDidDisappear(
  handler: (event: ComponentDidDisappearEvent) => void,
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentDidDisappearListener(event => {
      const equalComponentId = event.componentId === componentId

      if (componentId && !equalComponentId) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, componentId])
}
