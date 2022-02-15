import { Navigation, Options } from 'react-native-navigation'
import PlatformColor from 'ui/PlatformColor'
import { isIphone } from 'utils/platform'
import { SCREENS, BOTTOM_TABS_ID } from './constants'
import { componentId } from './events'

export let isMentionOpen = false

type PassProps = { [passProp: string]: any }

type OptionsWithPassProps = {
  options?: Options
} & PassProps

export function navigateWithoutContext(
  screen: SCREENS,
  { options = {}, ...passProps }: OptionsWithPassProps = {}
) {
  try {
    Navigation.push(componentId, {
      component: {
        name: screen,
        options,
        passProps,
      },
    })
  } catch {}
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
  try {
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
  } catch {}
}

export async function showHalfpanel(passProps: PassProps) {
  try {
    await Navigation.showOverlay({
      component: {
        name: SCREENS.HALFPANEL,
        options: {
          overlay: {
            handleKeyboardEvents: true,
            interceptTouchOutside: false,
          },
          layout: {
            componentBackgroundColor: 'transparent',
          },
        },
        passProps,
      },
    })
  } catch {}
}

export async function dismissHalfpanel() {
  try {
    await Navigation.dismissAllOverlays()
  } catch {}
}

export function showMention(passProps: PassProps) {
  try {
    if (!isMentionOpen) {
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
    isMentionOpen = true
  } catch {
    isMentionOpen = true
  }
}

export function dismissMention() {
  try {
    Navigation.dismissOverlay(SCREENS.MENTION)
    isMentionOpen = false
  } catch {
    isMentionOpen = false
  }
}

export function showEditPost(passProps: PassProps) {
  try {
    Navigation.showOverlay({
      component: {
        id: SCREENS.EDIT_POST,
        name: SCREENS.EDIT_POST,
        options: {
          overlay: {
            handleKeyboardEvents: true,
            interceptTouchOutside: false,
          },
        },
        passProps,
      },
    })
  } catch {}
}

export function dismissEditPost() {
  try {
    Navigation.dismissOverlay(SCREENS.EDIT_POST)
  } catch {}
}

export function showNotificationBadge() {
  Navigation.mergeOptions(SCREENS.NOTIFICATIONS, {
    bottomTab: {
      dotIndicator: {
        color: PlatformColor.error,
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
