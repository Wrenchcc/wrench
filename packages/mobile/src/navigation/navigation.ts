import { Navigation } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { feed, explore, notification, profile, add } from 'images'
import { loadSelectedProjectId } from 'store/post'
import { SCREENS, BOTTOM_TABS_ID, STATUS_BAR } from './constants'
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
    layout: {
      backgroundColor: COLORS.DARK,
    },
    statusBar: {
      style: STATUS_BAR.LIGHT,
      backgroundColor: 'transparent',
      drawBehind: true,
      visible: false,
    },
    topBar: {
      height: 0,
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
              backgroundColor: COLORS.DARK,
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
                        topBar: {
                          height: 0,
                          visible: false,
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
                        topBar: {
                          height: 0,
                          visible: false,
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
                      id: SCREENS.ADD_MEDIA,
                      name: SCREENS.ADD_MEDIA,
                      options: {
                        bottomTab: {
                          selectTabOnPress: false,
                          icon: add,
                          iconColor: COLORS.TAB_ICON,
                          selectedIconColor: COLORS.WHITE,
                        },
                        topBar: {
                          height: 0,
                          visible: false,
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
                        topBar: {
                          height: 0,
                          visible: false,
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
                        topBar: {
                          height: 0,
                          visible: false,
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
