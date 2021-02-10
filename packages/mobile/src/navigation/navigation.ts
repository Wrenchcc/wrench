import { Navigation } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { feed, explore, notification, profile, add } from 'images'
import { SCREENS, BOTTOM_TABS_ID } from './constants'
import defaultOptions from './defaultOptions'

export async function Bootstrap() {
  Navigation.setDefaultOptions(defaultOptions)

  await Navigation.setRoot({
    root: {
      component: {
        name: SCREENS.INITIALIZING,
      },
    },
  })
}

export async function AuthNavigation() {
  Navigation.setDefaultOptions({
    ...defaultOptions,
    animations: {
      setRoot: {
        waitForRender: true,
        alpha: {
          from: 0,
          to: 1,
          duration: 350,
        },
      },
    },
    statusBar: {
      drawBehind: true,
      style: 'light',
      backgroundColor: 'transparent',
    },
  })

  await Navigation.setRoot({
    root: {
      component: {
        name: SCREENS.SIGN_IN,
      },
    },
  })
}

export async function AppNavigation(onboarding: boolean) {
  Navigation.setDefaultOptions({
    ...defaultOptions,
    animations: {
      setRoot: {
        waitForRender: true,
        alpha: {
          from: 0,
          to: 1,
          duration: 350,
        },
      },
    },
  })

  if (onboarding) {
    await Navigation.setRoot({
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
    await Navigation.setRoot({
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
