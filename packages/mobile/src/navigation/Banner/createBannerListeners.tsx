import NetInfo from '@react-native-community/netinfo'
import messaging from '@react-native-firebase/messaging'
import { TOAST_TYPES } from 'utils/enums'
import { createPushNotificationsHandler } from 'utils/pushNotifications'
import NavigationBanner from './NavigationBanner'
import { showToast, showNotification } from './api'

export default function createBannerListeners() {
  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      NavigationBanner.dismiss()
    } else {
      showToast({
        type: TOAST_TYPES.NETWORK,
      })
    }
  })

  messaging().onMessage((remoteMessage) => {
    showNotification({
      body: remoteMessage.notification?.body,
      title: remoteMessage.data?.title,
      avatarUrl: remoteMessage.data?.avatarUrl,
      onPress: () => createPushNotificationsHandler(remoteMessage.data?.path),
    })
  })

  setTimeout(() => {
    showNotification({
      title: 'wfwef1',
      body: 'wefwef',
      avatarUrl:
        'https://edge-files.wrench.cc/avatar/cf89d01d-ee9e-4575-94da-9289dd831dac.jpg?w=320',
      onPress: () => {},
    })
  }, 2000)

  // setTimeout(() => {
  //   showNotification({
  //     title: 'wfwef2',
  //     body: 'wefwef',
  //     avatarUrl:
  //       'https://edge-files.wrench.cc/avatar/cf89d01d-ee9e-4575-94da-9289dd831dac.jpg?w=320',
  //     onPress: () => {},
  //   })
  // }, 3000)

  // setTimeout(() => {
  //   showNotification({
  //     title: 'wfwef3',
  //     body: 'wefwef',
  //     avatarUrl:
  //       'https://edge-files.wrench.cc/avatar/cf89d01d-ee9e-4575-94da-9289dd831dac.jpg?w=320',
  //     onPress: () => {},
  //   })
  // }, 4000)
}
