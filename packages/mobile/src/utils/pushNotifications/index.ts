import { navigateTo, SCREENS } from 'navigation'

export function createPushNotificationsHandler(data) {
  const [route, postId, commentId] = data.split('/')

  switch (route) {
    case SCREENS.NOTIFICATIONS.toLowerCase():
      return navigateTo(SCREENS.NOTIFICATIONS)
    case SCREENS.POST.toLowerCase():
      return navigateTo(SCREENS.POST, {
        commentId,
        postId,
      })
    default:
      return null
  }
}
