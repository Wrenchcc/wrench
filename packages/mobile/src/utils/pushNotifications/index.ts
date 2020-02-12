// TODO
import { navigate, SCREENS } from 'navigation'

export function createPushNotificationsHandler(data) {
  const [route, postId, commentId] = data.split('/')

  switch (route) {
    case SCREENS.NOTIFICATIONS.toLowerCase():
      return navigate(SCREENS.NOTIFICATIONS)
    case SCREENS.POST.toLowerCase():
      return navigate(SCREENS.POST, {
        commentId,
        postId,
      })
    default:
      return null
  }
}
