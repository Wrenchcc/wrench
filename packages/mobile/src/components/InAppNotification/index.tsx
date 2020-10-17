import React, { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { store } from 'gql'
import InAppNotificationMessage from 'ui/InAppNotificationMessage'
import { createPushNotificationsHandler } from 'utils/pushNotifications'

const InAppNotification = () => {
  const visible = useReactiveVar(store.notification.visibleVar)
  const currentNotification = useReactiveVar(store.notification.currentNotificationVar)

  const onNotificationPressHandler = useCallback(() => {
    store.notification.setVisible(false)

    if (currentNotification) {
      createPushNotificationsHandler(currentNotification?.path)
    }
  }, [currentNotification])

  return (
    <InAppNotificationMessage
      title={currentNotification?.title || ''}
      body={currentNotification?.body || ''}
      avatarUrl={currentNotification?.avatarUrl}
      visible={visible}
      onPress={onNotificationPressHandler}
      onFadeOutAnimationEnd={store.notification.onFadeOutAnimationEndHandler}
    />
  )
}

export default InAppNotification
