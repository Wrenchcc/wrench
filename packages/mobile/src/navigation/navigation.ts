import { Navigation } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { feed, explore, notifications, notificationsSelected, profile } from 'images'
import registerScreens from './registerScreens'
import { defaultOptions } from './options'
import { SCREENS } from './constants'

registerScreens()

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
    topBar: {
      visible: false,
    },
    statusBar: {
      style: 'light',
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
              style: 'light',
            },
          },
        },
      },
    })
  } else {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              bottomTabs: {
                children: [
                  {
                    component: {
                      name: SCREENS.FEED,
                      id: SCREENS.FEED,
                      options: {
                        bottomTab: {
                          icon: feed,
                          iconColor: COLORS.TAB_ICON,
                          selectedIconColor: COLORS.WHITE,
                        },
                      },
                    },
                  },
                  {
                    component: {
                      name: SCREENS.EXPLORE,
                      id: SCREENS.EXPLORE,
                      options: {
                        bottomTab: {
                          icon: explore,
                          iconColor: COLORS.TAB_ICON,
                          selectedIconColor: COLORS.WHITE,
                        },
                      },
                    },
                  },
                  {
                    component: {
                      name: SCREENS.NOTIFICATIONS,
                      id: SCREENS.NOTIFICATIONS,
                      options: {
                        bottomTab: {
                          icon: notifications,
                          selectedIcon: notificationsSelected,
                        },
                      },
                    },
                  },
                  {
                    component: {
                      name: SCREENS.ME,
                      id: SCREENS.ME,
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
