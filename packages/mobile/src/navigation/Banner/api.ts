import { InAppNotification, Toast } from 'ui'
import NavigationBanner from './NavigationBanner'

export const showToast = (props) => {
  NavigationBanner.show({
    component: Toast,
    props,
  })
}

export const showNotification = (props) => {
  NavigationBanner.show({
    component: InAppNotification,
    props,
  })
}
