import { Navigation } from 'react-native-navigation'
import {
  notificationsBadge,
  notificationsUnselectedBadge,
  notificationsSelected,
  notifications as notificationsIcon,
} from 'images'
import { SCREENS } from './constants'

let componentId

// NOTE: If overlay is open do not update the componentId
// push etc will stop working next navigate
Navigation.events().registerComponentDidAppearListener(({ componentId: id }) => {
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

export function navigateBack() {
  Navigation.pop(componentId)
}

export function resetNavigation() {
  Navigation.popToRoot(componentId)
}
