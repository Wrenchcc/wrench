import { makeVar } from '@apollo/client'

export const visibleVar = makeVar(false)
export const currentNotificationVar = makeVar(null)

export const setVisible = (s) => visibleVar(s)

export const setCurrentNotification = (notification) => currentNotificationVar(notification)

export const showNotification = (notification) => {
  setCurrentNotification({
    body: notification.body,
    title: notification.data?.title,
    avatarUrl: notification.data?.avatarUrl,
    path: notification.data?.path,
  })

  setVisible(true)
}

export const onFadeOutAnimationEndHandler = () => {
  setVisible(false)
  setCurrentNotification(null)
}
