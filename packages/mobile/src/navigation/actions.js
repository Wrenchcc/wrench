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

export const navigateToAddMedia = () => push('add-media')
export const navigateToAddModel = () => push('add-project-model')
export const navigateToAddPost = params => push('add-post', params)
export const navigateToAddProject = params => push('add-project', params)
export const navigateToAddProjectType = () => push('add-project-type')
export const navigateToComments = params => push('comments', params)
export const navigateToEditProject = params => push('edit-project', params)
export const navigateToFeed = params => push('feed', params)
export const navigateToFollowers = params => push('followers', params)
export const navigateToOnboarding = () => push('onboarding')
export const navigateToPost = params => push('post', params)
export const navigateToProject = params => push('project', params)
export const navigateToSearch = params => navigate('search', params)
export const navigateToSettings = () => push('settings')
export const navigateToUser = params => push('user', params)
export const navigateToWebView = params => push('webview', params)
