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

Links.addRoute('/explore', () => {
  return navigateTo(SCREENS.EXPLORE)
})

Links.addRoute('/feed', () => {
  return navigateTo(SCREENS.FEED)
})

Links.addRoute('/notifications', () => {
  return navigateTo(SCREENS.NOTIFICATIONS)
})

Links.addRoute('/me', () => {
  return navigateTo(SCREENS.ME)
})

Links.addRoute('/:username', ({ username }) => {
  return navigateTo(SCREENS.USER, { user: { username } })
})
