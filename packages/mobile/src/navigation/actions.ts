import { Navigation } from 'react-native-navigation'
import {
  notificationsBadge,
  notificationsUnselectedBadge,
  notificationsSelected,
  notifications as notificationsIcon,
} from 'images'
import { SCREENS } from './constants'

let componentId
let overlay

// NOTE: If overlay is open do not update the componentId
// push etc will stop working next navigate
Navigation.events().registerComponentDidAppearListener(({ componentId: id }) => {
  if (id !== SCREENS.MENTION) {
    componentId = id
  }
})

export function navigateTo(screen, { options, ...passProps } = {}) {
  Navigation.push(componentId, {
    component: {
      name: screen,
      options,
      passProps,
    },
  })
}

export function showModal(screen, { options, ...passProps } = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: screen,
            options,
            passProps,
          },
        },
      ],
    },
  })
}

export function showMention(passProps) {
  if (!overlay) {
    Navigation.showOverlay({
      component: {
        id: SCREENS.MENTION,
        name: SCREENS.MENTION,
        options: {
          layout: {
            backgroundColor: 'transparent',
          },
        },
        passProps,
      },
    })
  }

  overlay = true
}

export function dismissMention() {
  if (overlay) {
    overlay = false
    Navigation.dismissOverlay(SCREENS.MENTION)
  }
}

export function dismissModal() {
  Navigation.dismissModal(componentId)
}

export function navigate(screen, { options, ...passProps } = {}) {
  Navigation.push(componentId, {
    component: {
      name: screen,
      options,
      passProps,
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
