import { useEffect } from 'react'
import { Navigation } from 'react-native-navigation'
import { useScrollContext } from 'navigation'

function useScrollToTop() {
  const { scrollTo } = useScrollContext()

  useEffect(() => {
    const unsubscribe = Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        // We should scroll to top only when the screen is focused
        // const isFocused = currentComponentName === name
        // console.log(currentComponentName, name)
        const isFocused = true
        if (isFocused && selectedTabIndex === unselectedTabIndex) {
          scrollTo(-1000)
        }
      }
    )
    return () => unsubscribe.remove()
  }, [])
}

export default useScrollToTop
