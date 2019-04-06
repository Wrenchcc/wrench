import { Container } from 'unstated'
import NetInfo from '@react-native-community/netinfo'

export default class ToastNotificationContainer extends Container {
  state = {
    message: null,
    show: false,
    type: 'default',
  }

  constructor() {
    super()
    // TODO: Check why isConnected is false on Android emulator
    if (!__DEV__) {
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange)
    }
  }

  handleConnectionChange = isConnected => {
    if (isConnected) {
      this.hideNotification()
    } else {
      this.showNotification({ type: 'network' })
    }
  }

  showNotification = ({ type, message, dismissAfter }) => {
    if (dismissAfter) {
      setTimeout(this.hideNotification, dismissAfter)
    }

    this.setState({
      message,
      show: true,
      type,
    })
  }

  hideNotification = () => {
    this.setState({
      show: false,
    })
  }
}
