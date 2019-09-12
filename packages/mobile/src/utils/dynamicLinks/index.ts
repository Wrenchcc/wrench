import { Linking } from 'react-native'
import { navigateTo, SCREENS } from 'navigation'
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
  return navigateTo(SCREENS.PROJECT, { slug })
})

DeepLinking.addRoute('/:root', ({ root }) => {
  switch (root) {
    case SCREENS.FEED:
      return navigateTo(SCREENS.FEED)
    case SCREENS.EXPLORE:
      return navigateTo(SCREENS.EXPLORE)
    case SCREENS.NOTIFICATIONS:
      return navigateTo(SCREENS.NOTIFICATIONS)
    default:
      return navigateTo(SCREENS.USER, {
        user: {
          username: root,
        },
      })
  }
})
