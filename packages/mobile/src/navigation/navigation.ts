import { Navigation } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { feed, explore, notification, profile, add } from 'images'
import { SCREENS, BOTTOM_TABS_ID } from './constants'
import defaultOptions from './defaultOptions'

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
    modalPresentationStyle: 'fullScreen',
    navigationBar: {
      backgroundColor: COLORS.DARK,
    },
    topBar: {
      drawBehind: true,
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

export function AppNavigation(onboarding: boolean) {
  Navigation.setDefaultOptions(defaultOptions)

  if (onboarding) {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: SCREENS.ONBOARDING,
              },
            },
          ],
        },
      },
    })
  } else {
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
                      id: SCREENS.EMPTY,
                      name: SCREENS.EMPTY,
                      options: {
                        bottomTab: {
                          selectTabOnPress: false,
                          icon: add,
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
