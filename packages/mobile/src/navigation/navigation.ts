import { Navigation } from 'react-native-navigation'
import { feed, explore, notifications, profile } from 'images'
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
                      options: {
                        bottomTab: {
                          icon: feed,
                        },
                      },
                    },
                  },
                  {
                    component: {
                      name: SCREENS.EXPLORE,
                      options: {
                        bottomTab: {
                          icon: explore,
                        },
                      },
                    },
                  },
                  {
                    component: {
                      name: SCREENS.NOTIFICATIONS,
                      options: {
                        bottomTab: {
                          icon: notifications,
                        },
                      },
                    },
                  },
                  {
                    component: {
                      name: SCREENS.ME,
                      options: {
                        bottomTab: {
                          icon: profile,
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
