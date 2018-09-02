import { StatusBar } from 'react-native'
import { isIphone } from 'utils/platform'
import { NavigationActions } from 'react-navigation'
import { setCurrentScreen } from 'utils/analytics'

let navigator

const toggleStatusBar = hide => {
  if (isIphone) StatusBar.setHidden(hide, true)
}

// NOTE: Change when react navigation has support for statusBarConfig
const setDefaultStatusBar = () => {
  toggleStatusBar(false)
  StatusBar.setBarStyle('dark-content', true)
}

const changeStatusBar = routeName => {
  switch (routeName) {
    case 'add-post':
      toggleStatusBar(true)
      break
    case 'onboarding':
      StatusBar.setBarStyle('light-content', true)
      break
    default:
      setDefaultStatusBar()
  }
}

export function setNavigationRef(navigatorRef) {
  navigator = navigatorRef
}

export function navigate(routeName, params = {}) {
  setCurrentScreen(routeName)
  changeStatusBar(routeName)

  navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
    })
  )
}

export const navigateBack = () => {
  setDefaultStatusBar()
  navigator.dispatch(
    NavigationActions.back({
      key: null,
    })
  )
}
export const navigateToFeed = () => navigate('feed')
export const navigateToSettings = () => navigate('settings')
export const navigateToSearch = params => navigate('search', params)
export const navigateToProject = params => navigate('project', params)
export const navigateToFollowers = params => navigate('followers', params)
export const navigateToComments = params => navigate('comments', params)
export const navigateToUser = params => navigate('user', params)
export const navigateToEditProject = params => navigate('edit-project', params)
export const navigateToPost = () => navigate('add-post')
export const navigateToOnboarding = () => navigate('onboarding')
export const navigateToWebView = params => navigate('webview', params)
