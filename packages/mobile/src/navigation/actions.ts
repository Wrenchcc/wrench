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

export function showMention(options) {
  Navigation.showOverlay({
    component: {
      name: SCREENS.MENTION,
      id: SCREENS.MENTION,
      options: {
        layout: {
          backgroundColor: 'transparent',
        },
        overlay: {
          interceptTouchOutside: false,
        },
      },
    },
  })
}

export function dismissMention() {
  Navigation.dismissOverlay(SCREENS.MENTION)
}

export function dismissModal() {
  Navigation.dismissModal(componentId)
}

export function navigate(screen, { options, ...params } = {}) {
  Navigation.push(componentId, {
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

export const navigateToFeed = () => navigateTo(SCREENS.FEED)
export const navigateToProject = params => navigateTo(SCREENS.PROJECT, params)
export const navigateToUser = params => navigateTo(SCREENS.USER, params)
export const navigateToAddProject = params => showModal(SCREENS.ADD_PROJECT, params)
export const navigateToAddProjectType = () => navigateTo(SCREENS.ADD_PROJECT_TYPE)
export const navigateToAddPost = () => navigateTo(SCREENS.ADD_POST)
export const navigateToAddMedia = () => navigateTo(SCREENS.ADD_MEDIA)
