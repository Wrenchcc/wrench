import { InAppNotification, Toast, Posting } from 'ui'
import NavigationBanner from './NavigationBanner'

export const showToast = ({ dismissAfter = 3000, ...props }) => {
  NavigationBanner.show({
    component: Toast,
    dismissAfter,
    props,
  })
}

export const showNotification = ({ onPress, ...props }) => {
  NavigationBanner.show({
    component: InAppNotification,
    gestureEnabled: true,
    dismissAfter: 4000,
    onPress,
    props,
  })
}

export const showPosting = (props) => {
  NavigationBanner.show({
    component: Posting,
    props,
  })
}
