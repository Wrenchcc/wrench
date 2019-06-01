import { Navigation } from 'react-native-navigation'
import {
  notificationsBadge,
  notificationsUnselectedBadge,
  notificationsSelected,
  notifications as notificationsIcon,
} from 'images'
import { SCREENS } from './constants'

let componentId

Navigation.events().registerComponentDidAppearListener(({ componentId: id }) => {
  // NOTE: If overlay is open do not update the componentId
  // push etc will stop working next navigate
  if (id !== SCREENS.MENTION) {
    componentId = id
  }
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

export function showMention(params) {
  Navigation.showOverlay({
    component: {
      name: SCREENS.MENTION,
      id: SCREENS.MENTION,
      passProps: params,
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

export function showNotificationBadge() {
  Navigation.mergeOptions(SCREENS.NOTIFICATIONS, {
    bottomTab: {
      icon: notificationsUnselectedBadge,
      selectedIcon: notificationsBadge,
    },
  })
}

export function hideNotificationBadge() {
  Navigation.mergeOptions(SCREENS.NOTIFICATIONS, {
    bottomTab: {
      icon: notificationsIcon,
      selectedIcon: notificationsSelected,
    },
  })
}

export const navigateBack = () => Navigation.pop(componentId)
export const resetNavigation = () => Navigation.popToRoot(componentId)

export const navigateToFeed = () => navigateTo(SCREENS.FEED)
export const navigateToProject = params => navigateTo(SCREENS.PROJECT, params)
export const navigateToUser = params => navigateTo(SCREENS.USER, params)
export const navigateToAddProject = params => showModal(SCREENS.ADD_PROJECT, params)
export const navigateToAddProjectType = () => navigateTo(SCREENS.ADD_PROJECT_TYPE)
export const navigateToAddPost = () => navigateTo(SCREENS.ADD_POST)
export const navigateToAddMedia = () => navigateTo(SCREENS.ADD_MEDIA)
