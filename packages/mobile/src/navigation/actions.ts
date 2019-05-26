import { Navigation } from 'react-native-navigation'
import { SCREENS } from './constants'

let componentId

Navigation.events().registerComponentDidAppearListener(({ componentId: id }) => {
  componentId = id
})

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

export function navigate(screen, { options, ...params }) {
  return Navigation.push(componentId, {
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

export const navigateToFeed = params => navigateTo(SCREENS.FEED, params)
export const navigateToProject = params => navigateTo(SCREENS.PROJECT, params)
export const navigateToUser = params => navigateTo(SCREENS.USER, params)

export const navigateToSearch = params => navigateTo('search', params)
export const navigateToAddMedia = () => navigateTo('add-media')
export const navigateToAddPost = params => navigateTo('add-post', params)
export const navigateToAddProject = params => navigateTo('add-project', params)
export const navigateToAddProjectType = () => navigateTo('add-project-type')
export const navigateToEditProject = params => navigateTo('edit-project', params)
export const navigateToOnboarding = () => navigateTo('onboarding')
export const navigateToSettings = () => navigateTo('settings')
export const navigateToPost = params => navigateTo('post', params)
