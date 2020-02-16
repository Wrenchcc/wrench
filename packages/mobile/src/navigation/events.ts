import { Navigation } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { getCurrentUserProjects } from 'services/gql'
import { logError } from 'utils/sentry'
import { SCREENS, TABS_INDEX, NAVIGATION_ACTIONS } from './constants'

// TODO: Find a way to konw when pressing tab from
// stack that we should not scroll to top first press
export let currentComponentName

Navigation.events().registerComponentDidAppearListener(({ componentName }) => {
  currentComponentName = componentName
})

Navigation.events().registerNavigationButtonPressedListener(({ buttonId, componentId }) => {
  switch (buttonId) {
    case NAVIGATION_ACTIONS.BACK:
      return Navigation.pop(componentId)
    case NAVIGATION_ACTIONS.DISMISS_MODAL:
      return Navigation.dismissModal(componentId)
    default:
      return
  }
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
                  topBar: {
                    visible: false,
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
