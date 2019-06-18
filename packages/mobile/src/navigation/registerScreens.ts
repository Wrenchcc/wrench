import { Navigation } from 'react-native-navigation'
import { SCREENS } from './constants'
import HOC from './HOC'

export default function registerScreens() {
  Navigation.registerComponent(SCREENS.INITIALIZING, () => HOC(require('./Initializing').default))
  Navigation.registerComponent(SCREENS.MENTION, () => HOC(require('components/Mention').default))
  Navigation.registerComponent(SCREENS.WEBVIEW, () => HOC(require('components/WebView').default))
  Navigation.registerComponent(SCREENS.ONBOARDING, () =>
    HOC(require('features/signIn/containers/Onboarding').default)
  )
  Navigation.registerComponent(SCREENS.SIGN_IN, () =>
    HOC(require('features/signIn/containers/SignIn').default)
  )
  Navigation.registerComponent(SCREENS.FEED, () =>
    HOC(require('features/feed/containers/Feed').default)
  )
  Navigation.registerComponent(SCREENS.EXPLORE, () =>
    HOC(require('features/explore/containers/Explore').default)
  )
  Navigation.registerComponent(SCREENS.NOTIFICATIONS, () =>
    HOC(require('features/notifications/containers/Notifications').default)
  )
  Navigation.registerComponent(SCREENS.ME, () =>
    HOC(require('features/user/containers/Me').default)
  )
  Navigation.registerComponent(SCREENS.PROJECT, () =>
    HOC(require('features/project/containers/Project').default)
  )
  Navigation.registerComponent(SCREENS.ADD_MEDIA, () =>
    HOC(require('features/project/containers/AddMedia').default)
  )
  Navigation.registerComponent(SCREENS.ADD_PROJECT, () =>
    HOC(require('features/project/containers/AddProject').default)
  )
  Navigation.registerComponent(SCREENS.ADD_POST, () =>
    HOC(require('features/project/containers/AddPost').default)
  )
  Navigation.registerComponent(SCREENS.EDIT_PROJECT, () =>
    HOC(require('features/project/containers/EditProject').default)
  )
  Navigation.registerComponent(SCREENS.ADD_PROJECT_MODEL, () =>
    HOC(require('features/project/containers/AddProjectModel').default)
  )
  Navigation.registerComponent(SCREENS.ADD_PROJECT_TYPE, () =>
    HOC(require('features/project/containers/AddProjectType').default)
  )
  Navigation.registerComponent(SCREENS.USER, () =>
    HOC(require('features/user/containers/User').default)
  )
  Navigation.registerComponent(SCREENS.FOLLOWERS, () =>
    HOC(require('features/project/containers/Followers').default)
  )
  Navigation.registerComponent(SCREENS.POST, () =>
    HOC(require('features/post/containers/Post').default)
  )
  Navigation.registerComponent(SCREENS.COMMENTS, () =>
    HOC(require('features/project/containers/Comments').default)
  )
  Navigation.registerComponent(SCREENS.SIGN_IN, () =>
    HOC(require('features/signIn/containers/SignIn').default)
  )
  Navigation.registerComponent(SCREENS.SETTINGS, () =>
    HOC(require('features/user/containers/Settings').default)
  )
}
