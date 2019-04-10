import { Navigation } from 'react-native-navigation'
import { feed, explore, notifications, profile } from 'images'
import registerScreens from './registerScreens'
import { iconInsets, defaultOptions } from './options'
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

export function TabNavigation() {
  Navigation.setDefaultOptions(defaultOptions)

  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.FEED,
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: feed,
                  iconInsets,
                  titleDisplayMode: 'alwaysHide',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.EXPLORE,
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: explore,
                  iconInsets,
                  titleDisplayMode: 'alwaysHide',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.NOTIFICATIONS,
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: notifications,
                  iconInsets,
                  titleDisplayMode: 'alwaysHide',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.ME,
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: profile,
                  iconInsets,
                  titleDisplayMode: 'alwaysHide',
                },
              },
            },
          },
        ],
      },
    },
  })
}
