import { navigateTo, SCREENS, SCREEN_PATH } from 'navigation'

export default function handlePushNotification(data) {
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
