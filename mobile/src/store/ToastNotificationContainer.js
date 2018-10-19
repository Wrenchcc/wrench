import { Container } from 'unstated'

export default class ToastNotificationContainer extends Container {
  state = {
    message: null,
    type: 'default',
  }

  showNotification = ({ type, message, dismissAfter }) => {
    if (dismissAfter) {
      setTimeout(this.hideNotification, dismissAfter)
    }

    this.setState({
      type,
      message,
    })
  }

  hideNotification = () => {
    this.setState({
      message: null,
    })
  }
}
