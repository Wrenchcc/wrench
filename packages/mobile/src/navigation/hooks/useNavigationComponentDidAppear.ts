import { useLayoutEffect } from 'react'
import { Navigation, ComponentDidAppearEvent } from 'react-native-navigation'
import useComponentId from './useComponentId'

export default function useNavigationComponentDidAppear(
  handler: (event: ComponentDidAppearEvent) => void
) {
  const componentId = useComponentId()

  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentDidAppearListener(event => {
      const equalComponentId = event.componentId === componentId

      if (componentId && !equalComponentId) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, componentId])
}
