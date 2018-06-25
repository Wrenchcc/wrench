import { NavigationActions } from 'react-navigation'

let navigator

export function setNavigationRef(navigatorRef) {
  navigator = navigatorRef
}

export function navigate(routeName, params = {}) {
  navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
    })
  )
}

export const navigateBack = () => navigator.dispatch(
  NavigationActions.back({
    key: null,
  })
)

export const navigateToSignIn = () => navigate('AuthNavigator')
export const navigateToFeed = () => navigate('feed')
export const navigateToSettings = () => navigate('settings')
export const navigateToSearch = params => navigate('search', params)
export const navigateToProject = params => navigate('project', params)
export const navigateToFollowers = params => navigate('followers', params)
export const navigateToComments = params => navigate('comments', params)
export const navigateToProfile = params => navigate('profile', params)
export const navigateToEditProject = params => navigate('edit-project', params)
export const navigateToPost = () => navigate('add-post')
export const navigateToOnboarding = () => navigate('onboarding')
export const navigateToWebView = params => navigate('webview', params)
