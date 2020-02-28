import { register } from 'react-native-bundle-splitter'
import { Navigation } from 'react-native-navigation'
import { SCREENS } from './constants'
import createScreenHoc from './createScreenHoc'

export default function registerScreens(client) {
  const HOC = createScreenHoc(client)

  Navigation.registerComponent(SCREENS.INITIALIZING, () =>
    HOC(register({ require: () => require('./Initializing') }))
  )
  Navigation.registerComponent(SCREENS.EMPTY, () => () => null)
  Navigation.registerComponent(SCREENS.MENTION, () =>
    HOC(register({ require: () => require('components/Mention') }))
  )
  Navigation.registerComponent(SCREENS.WEBVIEW, () =>
    HOC(register({ require: () => require('components/WebView') }))
  )
  Navigation.registerComponent(SCREENS.EDIT_POST, () =>
    HOC(register({ require: () => require('components/EditPost') }))
  )
  Navigation.registerComponent(SCREENS.CATEGORIES, () =>
    HOC(register({ require: () => require('features/explore/containers/Categories') }))
  )
  Navigation.registerComponent(SCREENS.ONBOARDING, () =>
    HOC(register({ require: () => require('features/signIn/containers/Onboarding') }))
  )
  Navigation.registerComponent(SCREENS.SIGN_IN, () =>
    HOC(register({ require: () => require('features/signIn/containers/SignIn') }))
  )
  Navigation.registerComponent(SCREENS.FEED, () =>
    HOC(register({ require: () => require('features/feed/containers/Feed') }))
  )
  Navigation.registerComponent(SCREENS.EXPLORE, () =>
    HOC(register({ require: () => require('features/explore/containers/Explore') }))
  )
  Navigation.registerComponent(SCREENS.NOTIFICATIONS, () =>
    HOC(
      register({
        require: () => require('features/notifications/containers/Notifications'),
      })
    )
  )
  Navigation.registerComponent(SCREENS.ME, () =>
    HOC(register({ require: () => require('features/user/containers/Me') }))
  )
  Navigation.registerComponent(SCREENS.PROJECT, () =>
    HOC(register({ require: () => require('features/project/containers/Project') }))
  )
  Navigation.registerComponent(SCREENS.ADD_MEDIA, () =>
    HOC(register({ require: () => require('features/project/containers/AddMedia') }))
  )
  Navigation.registerComponent(SCREENS.ADD_PROJECT, () =>
    HOC(register({ require: () => require('features/project/containers/AddProject') }))
  )
  Navigation.registerComponent(SCREENS.ADD_POST, () =>
    HOC(register({ require: () => require('features/project/containers/AddPost') }))
  )
  Navigation.registerComponent(SCREENS.EDIT_PROJECT, () =>
    HOC(register({ require: () => require('features/project/containers/EditProject') }))
  )
  Navigation.registerComponent(SCREENS.EDIT_MODEL, () =>
    HOC(require('features/project/containers/EditModel').default)
  )
  Navigation.registerComponent(SCREENS.ADD_PROJECT_MODEL, () =>
    HOC(require('features/project/containers/AddProjectModel').default)
  )
  Navigation.registerComponent(SCREENS.ADD_PROJECT_TYPE, () =>
    HOC(
      register({
        require: () => require('features/project/containers/AddProjectType'),
      })
    )
  )
  Navigation.registerComponent(SCREENS.USER, () =>
    HOC(register({ require: () => require('features/user/containers/User') }))
  )
  Navigation.registerComponent(SCREENS.FOLLOWERS, () =>
    HOC(register({ require: () => require('features/project/containers/Followers') }))
  )
  Navigation.registerComponent(SCREENS.POST, () =>
    HOC(register({ require: () => require('features/post/containers/Post') }))
  )
  Navigation.registerComponent(SCREENS.COMMENTS, () =>
    HOC(register({ require: () => require('features/project/containers/Comments') }))
  )
  Navigation.registerComponent(SCREENS.SIGN_IN, () =>
    HOC(register({ require: () => require('features/signIn/containers/SignIn') }))
  )
  Navigation.registerComponent(SCREENS.SETTINGS, () =>
    HOC(register({ require: () => require('features/user/containers/Settings') }))
  )
  Navigation.registerComponent(SCREENS.EDIT_PROFILE, () =>
    HOC(register({ require: () => require('features/user/containers/EditProfile') }))
  )
  Navigation.registerComponent(SCREENS.ADD_LOCATION, () =>
    HOC(register({ require: () => require('features/user/containers/AddLocation') }))
  )
  Navigation.registerComponent(SCREENS.OTHER_SIGN_IN_OPTIONS, () =>
    HOC(register({ require: () => require('features/signIn/containers/Other') }))
  )
  Navigation.registerComponent(SCREENS.PROJECT_SUGGESTIONS, () =>
    HOC(register({ require: () => require('features/signIn/containers/ProjectSuggestions') }))
  )
}
