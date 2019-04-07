import { Navigation } from 'react-native-navigation'
import Feed from 'features/feed/containers/Feed'
import Explore from 'features/explore/containers/Explore'
import Notifications from 'features/notifications/containers/Notifications'
import Me from 'features/profile/containers/Me'
import User from 'features/profile/containers/User'
import Project from 'features/project/containers/Project'
import HOC from './hoc'
import { SCREENS } from './constants'

export default function registerScreens() {
  Navigation.registerComponent(SCREENS.FEED, () => HOC(Feed))
  Navigation.registerComponent(SCREENS.EXPLORE, () => HOC(Explore))
  Navigation.registerComponent(SCREENS.NOTIFICATIONS, () => HOC(Notifications))
  Navigation.registerComponent(SCREENS.ME, () => HOC(Me))
  Navigation.registerComponent(SCREENS.PROJECT, () => HOC(Project))
  Navigation.registerComponent(SCREENS.USER, () => HOC(User))
}
