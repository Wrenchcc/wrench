import { Navigation } from 'react-native-navigation'
import { SCREENS } from './constants'

let componentId

Navigation.events().registerComponentDidAppearListener(({ componentId: id }) => {
  componentId = id
})

export function navigateTo(screen, { options, ...params } = {}) {
  Navigation.push(componentId, {
    component: {
      name: screen,
      passProps: params,
      options,
    },
  })
}

export function showModal(screen, { options, ...params } = {}) {
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

export function navigate(screen, { options, ...params } = {}) {
  return Navigation.push(componentId, {
    component: {
      name: screen,
      passProps: params,
      options,
    },
  })
}

export const navigateBack = () => Navigation.pop(componentId)

export const resetNavigation = () => {
  Navigation.popToRoot(componentId)
}

export const navigateToFeed = params => navigateTo(SCREENS.FEED, params)
export const navigateToProject = params => navigateTo(SCREENS.PROJECT, params)
export const navigateToUser = params => navigateTo(SCREENS.USER, params)
export const navigateToAddProject = params => showModal(SCREENS.ADD_PROJECT, params)
export const navigateToAddProjectType = () => navigateTo(SCREENS.ADD_PROJECT_TYPE)

export const navigateToAddMedia = () => navigateTo('add-media')
export const navigateToAddPost = params => navigateTo('add-post', params)
export const navigateToPost = params => navigateTo('post', params)
