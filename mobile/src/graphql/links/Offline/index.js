import { NetInfo } from 'react-native'
import QueueLink from 'apollo-link-queue'

const offlineLink = new QueueLink()

NetInfo.isConnected.addEventListener('connectionChange', isConnected => {
  if (isConnected) {
    offlineLink.open()
  } else {
    offlineLink.close()
  }
})

export default offlineLink
