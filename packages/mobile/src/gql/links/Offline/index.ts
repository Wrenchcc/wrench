import NetInfo from '@react-native-community/netinfo'
import QueueLink from 'apollo-link-queue'

const offlineLink = new QueueLink()

NetInfo.addEventListener(state => {
  if (state.isConnected) {
    offlineLink.open()
  } else {
    offlineLink.close()
  }
})

export default offlineLink
