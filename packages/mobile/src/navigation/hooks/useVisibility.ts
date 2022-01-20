import { useLayoutEffect, useState } from 'react'
import { Navigation } from 'react-native-navigation'
import useComponentId from './useComponentId'

export default function useVisibility() {
  const [visible, setVisible] = useState(false)
  const componentId = useComponentId()

  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentDidAppearListener((evt) => {
      setVisible(evt.componentId === componentId)
    })

    return () => subscription.remove()
  }, [])

  return visible
}
