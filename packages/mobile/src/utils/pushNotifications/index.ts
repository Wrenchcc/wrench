import { navigateWithoutContext, SCREENS } from 'navigation'

export function createPushNotificationsHandler(data) {
  const [route, postId, commentId] = data.split('/')

  switch (route) {
    case SCREENS.NOTIFICATIONS.toLowerCase():
      return navigateWithoutContext(SCREENS.NOTIFICATIONS)
    case SCREENS.POST.toLowerCase():
      return navigateWithoutContext(SCREENS.POST, {
        commentId,
        postId,
      })
    default:
      return null
  }
}
