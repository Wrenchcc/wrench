import { TextInput } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { isIphone } from 'utils/platform'
import { getCurrentUserProjects } from 'services/gql'
import { logError } from 'utils/sentry'
import { SCREENS, BOTTOM_TABS_ID, TABS_INDEX } from './constants'

export let currentComponentName
export let componentId
let overlay

// NOTE: If overlay is open do not update the componentId
// push etc will stop working next navigate
Navigation.events().registerComponentDidAppearListener(({ componentId: id, componentName }) => {
  currentComponentName = componentName
  if (id !== SCREENS.MENTION && id !== SCREENS.EDIT_POST) {
    componentId = id
  }
})

Navigation.events().registerBottomTabPressedListener(async ({ tabIndex }) => {
  if (tabIndex === TABS_INDEX.ADD) {
    try {
      const { data } = await getCurrentUserProjects()
      const screen = data.user.projects.edges.length > 0 ? SCREENS.ADD_MEDIA : SCREENS.ADD_PROJECT

      Navigation.showModal({
        stack: {
          children: [
            {
              component: {
                id: screen,
                name: screen,
                options: {
                  layout: {
                    backgroundColor:
                      data.user.projects.edges.length > 0 ? COLORS.DARK : COLORS.WHITE,
                  },
                  statusBar: {
                    backgroundColor: data.user.projects.edges.length > 0 ? 'black' : 'white',
                    style: data.user.projects.edges.length > 0 ? 'light' : 'dark',
                    visible: isIphone ? false : true,
                  },
                },
              },
            },
          ],
        },
      })
    } catch (err) {
      logError(err)
    }
  }
})

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

export function showEditPost(passProps) {
  if (!overlay) {
    Navigation.showOverlay({
      component: {
        id: SCREENS.EDIT_POST,
        name: SCREENS.EDIT_POST,
        options: {
          overlay: {
            handleKeyboardEvents: true,
          },
        },
        passProps,
      },
    })
  }

  overlay = true
}

export function dismissEditPost() {
  if (overlay) {
    overlay = false
    Navigation.dismissOverlay(SCREENS.EDIT_POST)
  }
}

export function dismissModal(root, currentTabIndex = TABS_INDEX.FEED) {
  Navigation.dismissModal(componentId)

  if (root) {
    selectTabIndex(currentTabIndex)
  }
}

export function navigate(screen, { options, ...passProps } = {}) {
  const currentlyFocusedField = TextInput.State
  if (currentlyFocusedField) {
    currentlyFocusedField.blurTextInput()
  }

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
      dotIndicator: {
        color: COLORS.ORANGE,
        size: isIphone ? 8 : 30,
        visible: true,
      },
    },
  })
}

export function hideNotificationBadge() {
  Navigation.mergeOptions(SCREENS.NOTIFICATIONS, {
    bottomTab: {
      dotIndicator: {
        visible: false,
      },
    },
  })
}

export function navigateBack() {
  Navigation.pop(componentId)
}

export function selectTabIndex(currentTabIndex) {
  Navigation.mergeOptions(BOTTOM_TABS_ID, {
    bottomTabs: {
      currentTabIndex,
    },
  })
}
