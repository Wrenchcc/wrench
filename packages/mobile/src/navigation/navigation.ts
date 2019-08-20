import { Navigation } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { feed, explore, notification, profile } from 'images'
import { loadSelectedProjectId } from 'store/post'
import { SCREENS, BOTTOM_TABS_ID, STATUS_BAR } from './constants'

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
  Navigation.setRoot({
    root: {
      component: {
        name: SCREENS.SIGN_IN,
        options: {
          statusBar: {
            style: STATUS_BAR.LIGHT,
          },
        },
      },
    },
  })
}

export function AppNavigation(onboarding) {
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
