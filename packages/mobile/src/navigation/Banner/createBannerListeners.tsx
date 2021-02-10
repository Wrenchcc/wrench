import NetInfo from '@react-native-community/netinfo'
import messaging from '@react-native-firebase/messaging'
import { TOAST_TYPES } from 'utils/enums'
import NavigationBanner from './NavigationBanner'
import { showToast, showNotification } from './api'

export default function createBannerListeners() {
  // setTimeout(() => {
  //         showToast({
  //   type: TOAST_TYPES.NETWORK,
  // })
  // }, 2000)

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
      path: remoteMessage.data?.path,
    })
  })
}
