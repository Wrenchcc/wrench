import { Navigation } from 'react-native-navigation'
import { SCREENS } from './constants'
import HOC from './Hoc'

export default function registerScreens() {
  Navigation.registerComponent(SCREENS.FEED, () => HOC(require('features/feed/containers/Feed').default))
  Navigation.registerComponent(SCREENS.EXPLORE, () => HOC(require('features/explore/containers/Explore').default))
  Navigation.registerComponent(SCREENS.NOTIFICATIONS, () => HOC(require('features/notifications/containers/Notifications').default))
  Navigation.registerComponent(SCREENS.ME, () => HOC(require('features/profile/containers/Me').default))
  Navigation.registerComponent(SCREENS.PROJECT, () => HOC(require('features/project/containers/Project').default))
  Navigation.registerComponent(SCREENS.USER, () => HOC(require('features/profile/containers/User').default))
  Navigation.registerComponent(SCREENS.FOLLOWERS, () => HOC(require('features/project/containers/Followers').default))
  Navigation.registerComponent(SCREENS.POST, () => HOC(require('features/post/containers/Post').default))
  Navigation.registerComponent(SCREENS.COMMENTS, () => HOC(require('features/project/containers/Comments').default))
  Navigation.registerComponent(SCREENS.WEBVIEW, () => HOC(require('features/webview/containers/WebView').default))
}
