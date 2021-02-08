import { Navigation } from 'react-native-navigation'
// import { Appearance } from 'react-native'
import { getCurrentUserProjects } from 'gql'
import { logError } from 'utils/sentry'
import { trackScreen } from 'utils/analytics'
import PlatformColor from 'ui/PlatformColor'
import { SCREENS, TABS_INDEX } from './constants'

// TODO: Find a way to know when pressing tab from
// stack that we should not scroll to top first press
export let currentComponentName
export let componentId

Navigation.events().registerComponentDidAppearListener(({ componentId: id, componentName }) => {
  componentId = id
  currentComponentName = componentName
  trackScreen(componentName)
})

// const dynamicColor =
//   Appearance.getColorScheme() === 'dark' ? DARK_THEME.default : LIGHT_THEME.default

// const dynamicStatusbar = Appearance.getColorScheme() === 'dark' ? 'light' : 'dark'

Navigation.events().registerBottomTabPressedListener(async ({ tabIndex }) => {
  if (tabIndex === TABS_INDEX.ADD) {
    try {
      const { data } = await getCurrentUserProjects()
      const hasProject = data.user.projects.edges.length > 0
      const screen = hasProject ? SCREENS.ADD_MEDIA : SCREENS.ADD_PROJECT

      Navigation.showModal({
        stack: {
          children: [
            {
              component: {
                id: screen,
                name: screen,
                options: {
                  layout: {
                    componentBackgroundColor: hasProject
                      ? PlatformColor.blackColor
                      : PlatformColor.defaultColor,
                  },
                  statusBar: {
                    backgroundColor: hasProject
                      ? PlatformColor.blackColor
                      : PlatformColor.defaultColor,
                    // style: hasProject ? 'light' : dynamicStatusbar,
                  },
                },
              },
            },
          ],
        },
      })
    } catch (err) {
      logError(err)
    }
  }
})
