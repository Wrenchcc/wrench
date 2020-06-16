import { Navigation, Options } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { isIphone } from 'utils/platform'
import { SCREENS, BOTTOM_TABS_ID } from './constants'
import { componentId } from './events'

let mention: boolean

type PassProps = { [passProp: string]: any }

type OptionsWithPassProps = {
  options?: Options
} & PassProps

export function navigateWithoutContext(
  screen: SCREENS,
  { options = {}, ...passProps }: OptionsWithPassProps = {}
) {
  Navigation.push(componentId, {
    component: {
      name: screen,
      options,
      passProps,
    },
  })
}

export function selectTabIndex(currentTabIndex: number) {
  Navigation.mergeOptions(BOTTOM_TABS_ID, {
    bottomTabs: {
      currentTabIndex,
    },
  })
}

export function showModal(
  screen: SCREENS,
  { options = {}, ...passProps }: OptionsWithPassProps = {}
) {
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

export function showMention(passProps: PassProps) {
  if (!mention) {
    Navigation.showOverlay({
      component: {
        id: SCREENS.MENTION,
        name: SCREENS.MENTION,
        options: {
          layout: {
            componentBackgroundColor: 'transparent',
          },
        },
        passProps,
      },
    })
  }
  mention = true
}

export function dismissMention() {
  Navigation.dismissOverlay(SCREENS.MENTION)
  mention = false
}

export function showEditPost(passProps: PassProps) {
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

export function dismissEditPost() {
  Navigation.dismissOverlay(SCREENS.EDIT_POST)
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
