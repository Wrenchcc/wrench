import { Navigation } from 'react-native-navigation'
import { SCREENS } from './constants'
import Hoc from './Hoc'

export default function registerScreens() {
  Navigation.registerComponent(SCREENS.INITIALIZING, () => Hoc(require('./Initializing').default))
  Navigation.registerComponent(SCREENS.MENTION, () => Hoc(require('components/Mention').default))
  Navigation.registerComponent(SCREENS.WEBVIEW, () => Hoc(require('components/WebView').default))
  Navigation.registerComponent(SCREENS.ONBOARDING, () =>
    Hoc(require('features/signIn/containers/Onboarding').default)
  )
  Navigation.registerComponent(SCREENS.SIGN_IN, () =>
    Hoc(require('features/signIn/containers/SignIn').default)
  )
  Navigation.registerComponent(SCREENS.FEED, () =>
    Hoc(require('features/feed/containers/Feed').default)
  )
  Navigation.registerComponent(SCREENS.EXPLORE, () =>
    Hoc(require('features/explore/containers/Explore').default)
  )
  Navigation.registerComponent(SCREENS.NOTIFICATIONS, () =>
    Hoc(require('features/notifications/containers/Notifications').default)
  )
  Navigation.registerComponent(SCREENS.ME, () =>
    Hoc(require('features/user/containers/Me').default)
  )
  Navigation.registerComponent(SCREENS.PROJECT, () =>
    Hoc(require('features/project/containers/Project').default)
  )
  Navigation.registerComponent(SCREENS.ADD_MEDIA, () =>
    Hoc(require('features/project/containers/AddMedia').default)
  )
  Navigation.registerComponent(SCREENS.ADD_PROJECT, () =>
    Hoc(require('features/project/containers/AddProject').default)
  )
  Navigation.registerComponent(SCREENS.ADD_POST, () =>
    Hoc(require('features/project/containers/AddPost').default)
  )
  Navigation.registerComponent(SCREENS.EDIT_PROJECT, () =>
    Hoc(require('features/project/containers/EditProject').default)
  )
  Navigation.registerComponent(SCREENS.ADD_PROJECT_MODEL, () =>
    Hoc(require('features/project/containers/AddProjectModel').default)
  )
  Navigation.registerComponent(SCREENS.ADD_PROJECT_TYPE, () =>
    Hoc(require('features/project/containers/AddProjectType').default)
  )
  Navigation.registerComponent(SCREENS.USER, () =>
    Hoc(require('features/user/containers/User').default)
  )
  Navigation.registerComponent(SCREENS.FOLLOWERS, () =>
    Hoc(require('features/project/containers/Followers').default)
  )
  Navigation.registerComponent(SCREENS.POST, () =>
    Hoc(require('features/post/containers/Post').default)
  )
  Navigation.registerComponent(SCREENS.COMMENTS, () =>
    Hoc(require('features/project/containers/Comments').default)
  )
  Navigation.registerComponent(SCREENS.SIGN_IN, () =>
    Hoc(require('features/signIn/containers/SignIn').default)
  )
  Navigation.registerComponent(SCREENS.SETTINGS, () =>
    Hoc(require('features/user/containers/Settings').default)
  )
}
