import { Linking } from 'react-native'
import { navigateTo, SCREENS } from 'navigation'
import Routes from './Routes'

export const createDeepLinkingHandler = ({ url }) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Routes.evaluateUrl(url)
    }
  })
}

Routes.addScheme('wrench://')
Routes.addScheme('https://wrench.cc')

Routes.addRoute('/project/:slug', ({ slug }) => {
  return navigateTo(SCREENS.PROJECT, { slug })
})

Routes.addRoute('/:root', ({ root }) => {
  if (root === SCREENS.FEED) {
    return navigateTo(SCREENS.FEED)
  }

  if (root === SCREENS.EXPLORE) {
    return navigateTo(SCREENS.EXPLORE)
  }

  if (root === SCREENS.NOTIFICATIONS) {
    return navigateTo(SCREENS.NOTIFICATIONS)
  }

  return navigateTo(SCREENS.USER, {
    user: {
      username: root,
    },
  })
})
