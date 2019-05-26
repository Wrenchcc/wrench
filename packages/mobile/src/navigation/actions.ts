import { Navigation } from 'react-native-navigation'
import { SCREENS } from './constants'

let componentId

export function navigateTo(screen, { options, ...params }) {
  Navigation.push(componentId, {
    component: {
      name: screen,
      passProps: params,
      options,
    },
  })
}

export function showModal(screen, { options, ...params }) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: screen,
            passProps: params,
            options,
          },
        },
      ],
    },
  })
}

export function dismissModal() {
  Navigation.dismissModal(componentId)
}

export function navigate(id) {
  componentId = id

  return (screen, { options, ...params }) => Navigation.push(id, {
    component: {
      name: screen,
      passProps: params,
      options: {
        ...options,
      },
    },
  })
}

export const navigateBack = () => {
  // navigator.dispatch(
  //   NavigationActions.back({
  //     key: null,
  //   })
  // )
}

export const resetNavigation = () => {
  // navigator.dispatch(StackActions.popToTop())
}

const push = (screen, params) => {
  Navigation.push(componentId, {
    component: {
      name: screen,
      passProps: params,
    },
  })
}

export const navigateToFeed = params => push(SCREENS.FEED, params)
export const navigateToAddModel = () => push('add-project-model')
export const navigateToSearch = params => push('search', params)
export const navigateToAddMedia = () => push('add-media')
export const navigateToAddPost = params => push('add-post', params)
export const navigateToAddProject = params => push('add-project', params)
export const navigateToAddProjectType = () => push('add-project-type')
export const navigateToEditProject = params => push('edit-project', params)
export const navigateToFollowers = params => push('followers', params)
export const navigateToOnboarding = () => push('onboarding')
export const navigateToSettings = () => push('settings')
export const navigateToWebView = params => push('webview', params)
export const navigateToProject = params => push(SCREENS.PROJECT, params)
export const navigateToPost = params => push('post', params)
export const navigateToUser = params => push('user', params)
export const navigateToComments = params => push('comments', params)
