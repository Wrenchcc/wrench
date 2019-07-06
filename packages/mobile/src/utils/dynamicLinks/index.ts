import qs from 'url'
import { navigateTo, SCREENS, SCREEN_PATH } from 'navigation'

export const handleDynamicLink = link => {
  const { path } = qs.parse(link)
  const [route, value] = path.substring(1).split('/')

  switch (route) {
    case SCREEN_PATH.PROJECT:
      return navigateTo(SCREENS.PROJECT, { slug: value })
    default:
      return navigateTo(SCREENS.USER, { user: { username: route } })
  }
}

export const handlePushNotification = data => {
  const [route, postId, commentId] = data.split('/')

  switch (route) {
    case SCREEN_PATH.NOTIFICATIONS:
      return navigateTo(SCREENS.NOTIFICATIONS)
    case SCREEN_PATH.POST:
      return navigateTo(SCREENS.POST, {
        commentId,
        postId,
      })
    default:
      return null
  }
}
