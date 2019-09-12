import { Linking } from 'react-native'
import { navigateTo, SCREENS } from 'navigation'
import Links from './Links'

export const createDeepLinkingHandler = ({ url }) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Links.evaluateUrl(url)
    }
  })
}

Links.addScheme('wrench://')
Links.addScheme('https://wrench.cc')

Links.addRoute('/project/:slug', ({ slug }) => {
  return navigateTo(SCREENS.PROJECT, { slug })
})

Links.addRoute('/:root', ({ root }) => {
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
