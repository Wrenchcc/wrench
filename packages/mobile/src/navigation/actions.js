import { StackActions, NavigationActions } from 'react-navigation'
import { trackScreen } from 'utils/analytics'

let navigator

export function setNavigationRef(navigatorRef) {
  navigator = navigatorRef
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

export const navigateToAddMedia = () => navigate('add-media')
export const navigateToAddModel = () => navigate('add-project-model')
export const navigateToAddPost = params => navigate('add-post', params)
export const navigateToAddProject = params => navigate('add-project', params)
export const navigateToEditProject = params => navigate('edit-project', params)
export const navigateToAddProjectType = () => navigate('add-project-type')
export const navigateToComments = params => navigate('comments', params)
export const navigateToFeed = params => navigate('feed', params)
export const navigateToFollowers = params => navigate('followers', params)
export const navigateToOnboarding = () => navigate('onboarding')
export const navigateToProject = params => navigate('project', params)
export const navigateToSearch = params => navigate('search', params)
export const navigateToSettings = () => navigate('settings')
export const navigateToUser = params => navigate('user', params)
export const navigateToWebView = params => navigate('webview', params)
