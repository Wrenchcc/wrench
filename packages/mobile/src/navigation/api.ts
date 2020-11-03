import { Navigation, Options, OptionsModalPresentationStyle } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { isIphone } from 'utils/platform'
import { SCREENS, BOTTOM_TABS_ID } from './constants'
import { componentId } from './events'

export let isMentionOpen = false
export let isHalpanelOpen = false

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
  } catch (err) {
    console.log(err)
  }
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
  } catch (err) {
    console.log(err)
  }
}

export function showHalfpanel(passProps: PassProps) {
  try {
    if (!isHalpanelOpen) {
      Navigation.showModal({
        component: {
          id: SCREENS.HALFPANEL,
          name: SCREENS.HALFPANEL,
          options: {
            modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
            layout: {
              backgroundColor: 'transparent',
              componentBackgroundColor: 'transparent',
            },
            animations: {
              showModal: {
                enabled: false,
                waitForRender: true,
              },
              dismissModal: {
                enabled: false,
              },
            },
          },
          passProps,
        },
      })
    }
    isHalpanelOpen = true
  } catch (err) {
    isHalpanelOpen = true
    console.log(err)
  }
}

export function dismissHalfpanel() {
  try {
    Navigation.dismissModal(SCREENS.HALFPANEL)
    isHalpanelOpen = false
  } catch (err) {
    isHalpanelOpen = false
    console.log(err)
  }
}

export function showMention(passProps: PassProps) {
  try {
    if (!isMentionOpen) {
      Navigation.showOverlay({
        component: {
          id: SCREENS.MENTION,
          name: SCREENS.MENTION,
          options: {
            overlay: {
              handleKeyboardEvents: true,
            },
            layout: {
              componentBackgroundColor: 'transparent',
            },
          },
          passProps,
        },
      })
    }
    isMentionOpen = true
  } catch (err) {
    isMentionOpen = true
    console.log(err)
  }
}

export function dismissMention() {
  try {
    Navigation.dismissOverlay(SCREENS.MENTION)
    isMentionOpen = false
  } catch (err) {
    isMentionOpen = false
    console.log(err)
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
          },
        },
        passProps,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export function dismissEditPost() {
  try {
    Navigation.dismissOverlay(SCREENS.EDIT_POST)
  } catch (err) {
    console.log(err)
  }
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
