import { Navigation } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { getCurrentUserProjects } from 'services/gql'
import { logError } from 'utils/sentry'
import { SCREENS, TABS_INDEX } from './constants'

// TODO: Find a way to konw when pressing tab from
// stack that we should not scroll to top first press
export let currentComponentName
export let componentId

Navigation.events().registerComponentDidAppearListener(({ componentId: id, componentName }) => {
  componentId = id
  currentComponentName = componentName
})

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
                    backgroundColor: hasProject ? COLORS.DARK : COLORS.WHITE,
                    componentBackgroundColor: hasProject ? COLORS.DARK : COLORS.WHITE,
                  },
                  statusBar: {
                    visible: hasProject ? false : true,
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
