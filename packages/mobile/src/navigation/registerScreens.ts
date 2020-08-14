import { register } from 'react-native-bundle-splitter'
import { Navigation } from 'react-native-navigation'
import { SCREENS } from './constants'
import createScreenHoc from './createScreenHoc'

export default function registerScreens(client) {
  const HOC = createScreenHoc(client)

  Navigation.setLazyComponentRegistrator((componentName) => {
    switch (componentName) {
      case SCREENS.ME:
        Navigation.registerComponent(SCREENS.ME, () =>
          HOC(register({ require: () => require('features/user/containers/Me') }))
        )

      case SCREENS.PROJECT:
        Navigation.registerComponent(SCREENS.PROJECT, () =>
          HOC(register({ require: () => require('features/project/containers/Project') }))
        )

      case SCREENS.EXPLORE:
        Navigation.registerComponent(SCREENS.EXPLORE, () =>
          HOC(register({ require: () => require('features/explore/containers/Explore') }))
        )

      case SCREENS.EXPLORE:
        Navigation.registerComponent(SCREENS.FEED, () =>
          HOC(register({ require: () => require('features/feed/containers/Feed') }))
        )
      case SCREENS.USER:
        Navigation.registerComponent(SCREENS.USER, () =>
          HOC(register({ require: () => require('features/user/containers/User') }))
        )

      case SCREENS.FOLLOWERS:
        Navigation.registerComponent(SCREENS.FOLLOWERS, () =>
          HOC(register({ require: () => require('features/project/containers/Followers') }))
        )

      case SCREENS.POST:
        Navigation.registerComponent(SCREENS.POST, () =>
          HOC(register({ require: () => require('features/post/containers/Post') }))
        )

      case SCREENS.COMMENTS:
        Navigation.registerComponent(SCREENS.COMMENTS, () =>
          HOC(register({ require: () => require('features/project/containers/Comments') }))
        )

      case SCREENS.SIGN_IN:
        Navigation.registerComponent(SCREENS.SIGN_IN, () =>
          HOC(register({ require: () => require('features/signIn/containers/SignIn') }))
        )

      case SCREENS.SETTINGS:
        Navigation.registerComponent(SCREENS.SETTINGS, () =>
          HOC(register({ require: () => require('features/user/containers/Settings') }))
        )

      case SCREENS.EDIT_PROFILE:
        Navigation.registerComponent(SCREENS.EDIT_PROFILE, () =>
          HOC(register({ require: () => require('features/user/containers/EditProfile') }))
        )

      case SCREENS.ADD_LOCATION:
        Navigation.registerComponent(SCREENS.ADD_LOCATION, () =>
          HOC(register({ require: () => require('features/user/containers/AddLocation') }))
        )

      case SCREENS.OTHER_SIGN_IN_OPTIONS:
        Navigation.registerComponent(SCREENS.OTHER_SIGN_IN_OPTIONS, () =>
          HOC(register({ require: () => require('features/signIn/containers/Other') }))
        )

      case SCREENS.PROJECT_SUGGESTIONS:
        Navigation.registerComponent(SCREENS.PROJECT_SUGGESTIONS, () =>
          HOC(register({ require: () => require('features/signIn/containers/ProjectSuggestions') }))
        )

      case SCREENS.PUSH_NOTIFICATIONS:
        Navigation.registerComponent(SCREENS.PUSH_NOTIFICATIONS, () =>
          HOC(register({ require: () => require('features/signIn/containers/PushNotifications') }))
        )

      case SCREENS.HASHTAG:
        Navigation.registerComponent(SCREENS.HASHTAG, () =>
          HOC(register({ require: () => require('features/explore/containers/Hashtag') }))
        )

      case SCREENS.LIKES:
        Navigation.registerComponent(SCREENS.LIKES, () =>
          HOC(register({ require: () => require('features/project/containers/Likes') }))
        )
      case SCREENS.HALFPANEL:
        Navigation.registerComponent(SCREENS.HALFPANEL, () =>
          HOC(register({ require: () => require('navigation/Halfpanel') }))
        )

      case SCREENS.BOOKMARKS:
        Navigation.registerComponent(SCREENS.BOOKMARKS, () =>
          HOC(register({ require: () => require('features/user/containers/Bookmarks') }))
        )

      case SCREENS.INITIALIZING:
        Navigation.registerComponent(SCREENS.INITIALIZING, () =>
          register({ require: () => require('navigation/Initializing') })
        )

      case SCREENS.EMPTY:
        Navigation.registerComponent(SCREENS.EMPTY, () => () => null)

      case SCREENS.MENTION:
        Navigation.registerComponent(SCREENS.MENTION, () =>
          HOC(register({ require: () => require('components/Mention') }))
        )

      case SCREENS.WEBVIEW:
        Navigation.registerComponent(SCREENS.WEBVIEW, () =>
          HOC(register({ require: () => require('components/WebView') }))
        )

      case SCREENS.EDIT_POST:
        Navigation.registerComponent(SCREENS.EDIT_POST, () =>
          HOC(register({ require: () => require('components/EditPost') }))
        )

      case SCREENS.CATEGORIES:
        Navigation.registerComponent(SCREENS.CATEGORIES, () =>
          HOC(register({ require: () => require('features/explore/containers/Categories') }))
        )

      case SCREENS.ONBOARDING:
        Navigation.registerComponent(SCREENS.ONBOARDING, () =>
          HOC(register({ require: () => require('features/signIn/containers/Onboarding') }))
        )

      case SCREENS.SIGN_IN:
        Navigation.registerComponent(SCREENS.SIGN_IN, () =>
          HOC(register({ require: () => require('features/signIn/containers/SignIn') }))
        )

      case SCREENS.NOTIFICATIONS:
        Navigation.registerComponent(SCREENS.NOTIFICATIONS, () =>
          HOC(
            register({
              require: () => require('features/notifications/containers/Notifications'),
            })
          )
        )

      case SCREENS.ADD_MEDIA:
        Navigation.registerComponent(SCREENS.ADD_MEDIA, () =>
          HOC(register({ require: () => require('features/project/containers/AddMedia') }))
        )

      case SCREENS.ADD_PROJECT:
        Navigation.registerComponent(SCREENS.ADD_PROJECT, () =>
          HOC(register({ require: () => require('features/project/containers/AddProject') }))
        )

      case SCREENS.ADD_POST:
        Navigation.registerComponent(SCREENS.ADD_POST, () =>
          HOC(register({ require: () => require('features/project/containers/AddPost') }))
        )

      case SCREENS.ADD_POST_TO_COLLECTION:
        Navigation.registerComponent(SCREENS.ADD_POST_TO_COLLECTION, () =>
          HOC(
            register({ require: () => require('features/project/containers/AddPostToCollection') })
          )
        )

      case SCREENS.COLLECTIONS:
        Navigation.registerComponent(SCREENS.COLLECTIONS, () =>
          HOC(register({ require: () => require('features/project/containers/Collections') }))
        )

      case SCREENS.EDIT_COLLECTION:
        Navigation.registerComponent(SCREENS.EDIT_COLLECTION, () =>
          HOC(register({ require: () => require('features/project/containers/EditCollection') }))
        )

      case SCREENS.EDIT_PROJECT:
        Navigation.registerComponent(SCREENS.EDIT_PROJECT, () =>
          HOC(register({ require: () => require('features/project/containers/EditProject') }))
        )

      case SCREENS.EDIT_MODEL:
        Navigation.registerComponent(SCREENS.EDIT_MODEL, () =>
          HOC(require('features/project/containers/EditModel').default)
        )

      case SCREENS.ADD_PROJECT_MODEL:
        Navigation.registerComponent(SCREENS.ADD_PROJECT_MODEL, () =>
          HOC(require('features/project/containers/AddProjectModel').default)
        )

      case SCREENS.ADD_PROJECT_TYPE:
        Navigation.registerComponent(SCREENS.ADD_PROJECT_TYPE, () =>
          HOC(
            register({
              require: () => require('features/project/containers/AddProjectType'),
            })
          )
        )
      default:
        return
    }
  })
}
