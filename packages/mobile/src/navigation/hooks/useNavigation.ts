import { Navigation } from 'react-native-navigation'
import { TextInput } from 'react-native'
import { COLORS } from 'ui/constants'
import { isIphone } from 'utils/platform'
import { SCREENS, TABS_INDEX, BOTTOM_TABS_ID } from '../constants'
import useComponentId from './useComponentId'

let mention

export function selectTabIndex(currentTabIndex) {
  Navigation.mergeOptions(BOTTOM_TABS_ID, {
    bottomTabs: {
      currentTabIndex,
    },
  })
}

export function showModal(screen, { options, ...passProps } = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: screen,
            name: screen,
            options,
            passProps,
          },
        },
      ],
    },
  })
}

export default function useNavigation() {
  const componentId = useComponentId()

  return {
    navigate: (screen, { options, ...passProps } = {}) => {
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
    },
    showModal,
    showMention: passProps => {
      if (!mention) {
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
      mention = true
    },
    dismissMention: () => {
      Navigation.dismissOverlay(SCREENS.MENTION)
      mention = false
    },
    dismissModal: (root, currentTabIndex = TABS_INDEX.FEED) => {
      Navigation.dismissModal(componentId)

      if (root) {
        selectTabIndex(currentTabIndex)
      }
    },
    showEditPost: passProps => {
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
    },
    dismissEditPost: () => {
      Navigation.dismissOverlay(SCREENS.EDIT_POST)
    },
    navigateBack: () => {
      Navigation.pop(componentId)
    },
    showNotificationBadge: () => {
      Navigation.mergeOptions(SCREENS.NOTIFICATIONS, {
        bottomTab: {
          dotIndicator: {
            color: COLORS.ORANGE,
            size: isIphone ? 8 : 30,
            visible: true,
          },
        },
      })
    },
    hideNotificationBadge: () => {
      Navigation.mergeOptions(SCREENS.NOTIFICATIONS, {
        bottomTab: {
          dotIndicator: {
            visible: false,
          },
        },
      })
    },
  }
}
