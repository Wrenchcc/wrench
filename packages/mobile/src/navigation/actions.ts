import { Navigation } from 'react-native-navigation'
import {
  notificationsBadge,
  notificationsUnselectedBadge,
  notificationsSelected,
  notifications as notificationsIcon,
} from 'images'
import { SCREENS, BOTTOM_TABS_ID } from './constants'

export let currentComponentName
let componentId
let overlay

// NOTE: If overlay is open do not update the componentId
// push etc will stop working next navigate
Navigation.events().registerComponentDidAppearListener(({ componentId: id, componentName }) => {
  currentComponentName = componentName
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

export function dismissModal(root) {
  Navigation.dismissModal(componentId)

  if (root) {
    Navigation.mergeOptions(BOTTOM_TABS_ID, {
      bottomTabs: {
        currentTabIndex: 0,
      },
    })
  }
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
