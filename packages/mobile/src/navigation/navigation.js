import { Navigation } from 'react-native-navigation'
import { feed, explore, notifications, profile } from 'images'
import registerScreens, { SCREENS } from './registerScreens'

registerScreens()

export function TabNavigation() {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      drawBehind: false,
      style: 'light',
    },
    bottomTabs: {
      backgroundColor: 'black',
    },
    bottomTab: {
      iconColor: 'grey',
      selectedIconColor: 'white',
      textColor: 'white',
    },
    layout: {
      backgroundColor: 'white',
      orientation: ['portrait'],
    },
  })

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
                    options: {
                      topBar: {
                        // hideOnScroll: true,
                        title: {
                          text: 'TAB 1',
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: feed,
                  iconInsets: { top: 0, left: 0, bottom: -20, right: 0 },
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
                    options: {
                      topBar: {
                        // hideOnScroll: true,
                        title: {
                          text: 'TAB 2',
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: explore,
                  iconInsets: { top: 0, left: 0, bottom: -20, right: 0 },
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
                    options: {
                      topBar: {
                        // hideOnScroll: true,
                        title: {
                          text: 'TAB 2',
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: notifications,
                  iconInsets: { top: 0, left: 0, bottom: -20, right: 0 },
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
                    options: {
                      topBar: {
                        // hideOnScroll: true,
                        title: {
                          text: 'TAB 2',
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: profile,
                  iconInsets: { top: 0, left: 0, bottom: -20, right: 0 },
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
