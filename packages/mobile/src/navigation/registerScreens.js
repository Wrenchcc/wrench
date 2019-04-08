import { Navigation } from 'react-native-navigation'
import Feed from 'features/feed/containers/Feed'
import Explore from 'features/explore/containers/Explore'
import Notifications from 'features/notifications/containers/Notifications'
import Me from 'features/profile/containers/Me'
import User from 'features/profile/containers/User'
import Project from 'features/project/containers/Project'
import Followers from 'features/project/containers/Followers'
import Post from 'features/post/containers/Post'
import Comments from 'features/project/containers/Comments'
import WebView from 'features/webview/containers/WebView'
import { SCREENS } from './constants'
import HOC from './hoc'

export default function registerScreens() {
  // Navigation.registerComponent(`TOP_BAR`, () => CustomTopBar);

  Navigation.registerComponent(SCREENS.FEED, () => HOC(Feed))
  Navigation.registerComponent(SCREENS.EXPLORE, () => HOC(Explore))
  Navigation.registerComponent(SCREENS.NOTIFICATIONS, () => HOC(Notifications))
  Navigation.registerComponent(SCREENS.ME, () => HOC(Me))
  Navigation.registerComponent(SCREENS.PROJECT, () => HOC(Project))
  Navigation.registerComponent(SCREENS.USER, () => HOC(User))
  Navigation.registerComponent(SCREENS.FOLLOWERS, () => HOC(Followers))
  Navigation.registerComponent(SCREENS.POST, () => HOC(Post))
  Navigation.registerComponent(SCREENS.COMMENTS, () => HOC(Comments))
  Navigation.registerComponent(SCREENS.WEBVIEW, () => HOC(WebView))
}
