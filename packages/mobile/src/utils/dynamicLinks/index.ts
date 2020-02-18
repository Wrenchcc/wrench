import { Linking } from 'react-native'
import { navigateWithoutContext, SCREENS, TABS_INDEX, selectTabIndex } from 'navigation'
import DeepLinking from 'react-native-deep-linking'

export const createDeepLinkingHandler = ({ url }) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      DeepLinking.evaluateUrl(url)
    }
  })
}

DeepLinking.addScheme('wrench://')
DeepLinking.addScheme('https://wrench.cc')

DeepLinking.addRoute('/project/:slug', ({ slug }) => {
  return navigateWithoutContext(SCREENS.PROJECT, { slug })
})

DeepLinking.addRoute('/post/:id', ({ id }) => {
  return navigateWithoutContext(SCREENS.POST, { postId: id })
})

DeepLinking.addRoute('/:root', ({ root }) => {
  switch (root) {
    case SCREENS.FEED.toLowerCase():
      return selectTabIndex(TABS_INDEX.FEED)
    case SCREENS.EXPLORE.toLowerCase():
      return selectTabIndex(TABS_INDEX.EXPLORE)
    case SCREENS.NOTIFICATIONS.toLowerCase():
      return selectTabIndex(TABS_INDEX.NOTIFICATIONS)
    case SCREENS.ME.toLowerCase():
      return selectTabIndex(TABS_INDEX.ME)
    default:
      return navigateWithoutContext(SCREENS.USER, {
        user: {
          username: root,
        },
      })
  }
})
