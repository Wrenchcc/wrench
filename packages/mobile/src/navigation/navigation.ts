import { Navigation } from 'react-native-navigation'
import { feed, explore, notifications, profile } from 'images'
import registerScreens from './registerScreens'
import { defaultOptions } from './options'
import { SCREENS } from './constants'

registerScreens()

export function AuthNavigation() {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
    },
  })

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SCREENS.SIGN_IN,
              options: {
                statusBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  })
}

export function AppNavigation() {
  Navigation.setDefaultOptions(defaultOptions)

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
