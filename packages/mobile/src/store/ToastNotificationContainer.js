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

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange)
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
