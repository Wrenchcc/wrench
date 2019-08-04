import { Navigation } from 'react-native-navigation'
import { Keyboard } from 'react-native'
import { COLORS } from 'ui/constants'
import { feed, explore, notification, profile } from 'images'
import { loadSelectedProjectId } from 'store/post'
import { isAndroid } from 'utils/platform'
import defaultOptions from './defaultOptions'
import { SCREENS, BOTTOM_TABS_ID, STATUS_BAR } from './constants'

if (isAndroid) {
  Keyboard.addListener('keyboardDidShow', () => {
    Navigation.mergeOptions(BOTTOM_TABS_ID, {
      bottomTabs: {
        drawBehind: true,
        visible: false,
      },
    })
  })

  Keyboard.addListener('keyboardDidHide', () => {
    Navigation.mergeOptions(BOTTOM_TABS_ID, {
      bottomTabs: {
        drawBehind: false,
        visible: true,
      },
    })
  })
}

export function Bootstrap() {
  Navigation.setRoot({
    root: {
      component: {
        name: SCREENS.INITIALIZING,
      },
    },
  })
}

export function AuthNavigation() {
  Navigation.setDefaultOptions({
    options: {
      layout: {
        backgroundColor: COLORS.DARK,
      },
    },
    statusBar: {
      style: STATUS_BAR.LIGHT,
    },
    topBar: {
      visible: false,
    },
  })

  Navigation.setRoot({
    root: {
      component: {
        name: SCREENS.SIGN_IN,
      },
    },
  })
}

export function AppNavigation(onboarding) {
  Navigation.setDefaultOptions(defaultOptions)

  if (onboarding) {
    Navigation.setRoot({
      root: {
        component: {
          name: SCREENS.ONBOARDING,
          options: {
            statusBar: {
              style: STATUS_BAR.LIGHT,
            },
          },
        },
      },
    })
  } else {
    // Load selected project when logged in
    loadSelectedProjectId()

    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: BOTTOM_TABS_ID,
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      id: SCREENS.FEED,
                      name: SCREENS.FEED,
                      options: {
                        bottomTab: {
                          icon: feed,
                          iconColor: COLORS.TAB_ICON,
                          selectedIconColor: COLORS.WHITE,
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      id: SCREENS.EXPLORE,
                      name: SCREENS.EXPLORE,
                      options: {
                        bottomTab: {
                          icon: explore,
                          iconColor: COLORS.TAB_ICON,
                          selectedIconColor: COLORS.WHITE,
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      id: SCREENS.NOTIFICATIONS,
                      name: SCREENS.NOTIFICATIONS,
                      options: {
                        bottomTab: {
                          icon: notification,
                          iconColor: COLORS.TAB_ICON,
                          selectedIconColor: COLORS.WHITE,
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      id: SCREENS.ME,
                      name: SCREENS.ME,
                      options: {
                        bottomTab: {
                          icon: profile,
                          iconColor: COLORS.TAB_ICON,
                          selectedIconColor: COLORS.WHITE,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    })
  }
}
