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

export const navigateToFeed = params => navigate('feed', params)
export const navigateToSearch = params => navigate('search', params)
export const navigateToAddMedia = () => navigate('add-media')
export const navigateToAddModel = () => navigate('add-project-model')
export const navigateToAddPost = params => navigate('add-post', params)
export const navigateToAddProject = params => push('add-project', params)
export const navigateToAddProjectType = () => navigate('add-project-type')
export const navigateToEditProject = params => navigate('edit-project', params)
export const navigateToFollowers = params => navigate('followers', params)
export const navigateToOnboarding = () => navigate('onboarding')
export const navigateToSettings = () => navigate('settings')
export const navigateToWebView = params => navigate('webview', params)

export const navigateToProject = params => push('project', params)
export const navigateToPost = params => push('post', params)
export const navigateToUser = params => push('user', params)
export const navigateToComments = params => push('comments', params)
