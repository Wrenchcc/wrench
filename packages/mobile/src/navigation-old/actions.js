import { StackActions, NavigationActions } from 'react-navigation'
import { trackScreen } from 'utils/analytics'

let navigator

export function setNavigationRef(navigatorRef) {
  navigator = navigatorRef
}

export function push(routeName, params = {}) {
  trackScreen(routeName)

  navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    })
  )
}

export function navigate(routeName, params = {}) {
  trackScreen(routeName)

  navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
    })
  )
}

export const navigateBack = () => {
  navigator.dispatch(
    NavigationActions.back({
      key: null,
    })
  )
}

export const resetNavigation = () => {
  navigator.dispatch(StackActions.popToTop())
}
