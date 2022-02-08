import { useEffect } from 'react'
import { Navigation } from 'react-native-navigation'
import { useScrollContext } from 'navigation'
import { currentComponentName } from '../events'

function useScrollToTop(screen, enabled = true) {
  const { scrollTo } = useScrollContext()

  useEffect(() => {
    const unsubscribe = Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        // We should scroll to top only when the screen is focused
        const isFocused = currentComponentName === screen

        if (isFocused && selectedTabIndex === unselectedTabIndex && enabled) {
          scrollTo(-1000)
        }
      }
    )
    return () => unsubscribe.remove()
  }, [])
}

export default useScrollToTop
