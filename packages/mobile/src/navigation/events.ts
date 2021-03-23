import { Navigation } from 'react-native-navigation'
import { Appearance } from 'react-native'
import { NAVIGATION_BANNER } from 'navigation/banner'
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
  // NOTE: Do not update id for banner
  // Navigation will not work in current stack
  if (componentName === NAVIGATION_BANNER) {
    return
  }

  componentId = id
  currentComponentName = componentName
  trackScreen(componentName)
})

const dynamicStatusbar = Appearance.getColorScheme() === 'dark' ? 'light' : 'dark'

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
                  topBar: {
                    visible: false,
                  },
                  layout: {
                    componentBackgroundColor: hasProject
                      ? PlatformColor.black
                      : PlatformColor.default,
                  },
                  statusBar: {
                    backgroundColor: hasProject ? PlatformColor.black : PlatformColor.default,
                    style: hasProject ? 'light' : dynamicStatusbar,
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
