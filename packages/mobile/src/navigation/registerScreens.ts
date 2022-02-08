import { Navigation } from 'react-native-navigation'
import { SCREENS } from './constants'
import createScreenHoc from './createScreenHoc'

export default function registerScreens(client) {
  const HOC = createScreenHoc(client)

  Navigation.setLazyComponentRegistrator((componentName) => {
    switch (componentName) {
      case SCREENS.ADD_MEDIA:
        Navigation.registerComponent(SCREENS.ADD_MEDIA, () =>
          HOC(require('features/project/containers/AddMedia').default)
        )

      case SCREENS.ME:
        Navigation.registerComponent(SCREENS.ME, () =>
          HOC(require('features/user/containers/Me').default)
        )

      case SCREENS.PROJECT:
        Navigation.registerComponent(SCREENS.PROJECT, () =>
          HOC(require('features/project/containers/Project').default)
        )

      case SCREENS.EXPLORE:
        Navigation.registerComponent(SCREENS.EXPLORE, () =>
          HOC(require('features/explore/containers/Explore').default)
        )

      case SCREENS.EXPLORE:
        Navigation.registerComponent(SCREENS.FEED, () =>
          HOC(require('features/feed/containers/Feed').default)
        )
      case SCREENS.USER:
        Navigation.registerComponent(SCREENS.USER, () =>
          HOC(require('features/user/containers/User').default)
        )

      case SCREENS.FOLLOWERS:
        Navigation.registerComponent(SCREENS.FOLLOWERS, () =>
          HOC(require('features/project/containers/Followers').default)
        )

      case SCREENS.POST:
        Navigation.registerComponent(SCREENS.POST, () =>
          HOC(require('features/post/containers/Post').default)
        )

      case SCREENS.COMMENTS:
        Navigation.registerComponent(SCREENS.COMMENTS, () =>
          HOC(require('features/project/containers/Comments').default)
        )

      case SCREENS.SIGN_IN:
        Navigation.registerComponent(SCREENS.SIGN_IN, () =>
          HOC(require('features/signIn/containers/SignIn').default)
        )

      case SCREENS.SETTINGS:
        Navigation.registerComponent(SCREENS.SETTINGS, () =>
          HOC(require('features/user/containers/Settings').default)
        )

      case SCREENS.EDIT_PROFILE:
        Navigation.registerComponent(SCREENS.EDIT_PROFILE, () =>
          HOC(require('features/user/containers/EditProfile').default)
        )

      case SCREENS.ADD_LOCATION:
        Navigation.registerComponent(SCREENS.ADD_LOCATION, () =>
          HOC(require('features/user/containers/AddLocation').default)
        )

      case SCREENS.OTHER_SIGN_IN_OPTIONS:
        Navigation.registerComponent(SCREENS.OTHER_SIGN_IN_OPTIONS, () =>
          HOC(require('features/signIn/containers/Other').default)
        )

      case SCREENS.PROJECT_SUGGESTIONS:
        Navigation.registerComponent(SCREENS.PROJECT_SUGGESTIONS, () =>
          HOC(require('features/signIn/containers/ProjectSuggestions').default)
        )

      case SCREENS.PUSH_NOTIFICATIONS:
        Navigation.registerComponent(SCREENS.PUSH_NOTIFICATIONS, () =>
          HOC(require('features/signIn/containers/PushNotifications').default)
        )

      case SCREENS.HASHTAG:
        Navigation.registerComponent(SCREENS.HASHTAG, () =>
          HOC(require('features/explore/containers/Hashtag').default)
        )

      case SCREENS.LIKES:
        Navigation.registerComponent(SCREENS.LIKES, () =>
          HOC(require('features/project/containers/Likes').default)
        )

      case SCREENS.HALFPANEL:
        Navigation.registerComponent(SCREENS.HALFPANEL, () =>
          HOC(require('navigation/Halfpanel').default)
        )

      case SCREENS.BOOKMARKS:
        Navigation.registerComponent(SCREENS.BOOKMARKS, () =>
          HOC(require('features/user/containers/Bookmarks').default)
        )

      case SCREENS.INITIALIZING:
        Navigation.registerComponent(
          SCREENS.INITIALIZING,
          () => require('navigation/Initializing').default
        )

      case SCREENS.INSPIRATION:
        Navigation.registerComponent(SCREENS.INSPIRATION, () =>
          HOC(require('features/explore/containers/Inspiration').default)
        )

      case SCREENS.EMPTY:
        Navigation.registerComponent(SCREENS.EMPTY, () => () => null)

      case SCREENS.MENTION:
        Navigation.registerComponent(SCREENS.MENTION, () =>
          HOC(require('components/Mention').default)
        )

      case SCREENS.WEBVIEW:
        Navigation.registerComponent(SCREENS.WEBVIEW, () =>
          HOC(require('components/WebView').default)
        )

      case SCREENS.EDIT_POST:
        Navigation.registerComponent(SCREENS.EDIT_POST, () =>
          HOC(require('components/EditPost').default)
        )

      case SCREENS.CATEGORIES:
        Navigation.registerComponent(SCREENS.CATEGORIES, () =>
          HOC(require('features/explore/containers/Categories').default)
        )

      case SCREENS.ONBOARDING:
        Navigation.registerComponent(SCREENS.ONBOARDING, () =>
          HOC(require('features/signIn/containers/Onboarding').default)
        )

      case SCREENS.SIGN_IN:
        Navigation.registerComponent(SCREENS.SIGN_IN, () =>
          HOC(require('features/signIn/containers/SignIn').default)
        )

      case SCREENS.NOTIFICATIONS:
        Navigation.registerComponent(SCREENS.NOTIFICATIONS, () =>
          HOC(require('features/notifications/containers/Notifications').default)
        )

      case SCREENS.ADD_PROJECT:
        Navigation.registerComponent(SCREENS.ADD_PROJECT, () =>
          HOC(require('features/project/containers/AddProject').default)
        )

      case SCREENS.ADD_POST:
        Navigation.registerComponent(SCREENS.ADD_POST, () =>
          HOC(require('features/project/containers/AddPost').default)
        )

      case SCREENS.ADD_POST_TO_COLLECTION:
        Navigation.registerComponent(SCREENS.ADD_POST_TO_COLLECTION, () =>
          HOC(require('features/project/containers/AddPostToCollection').default)
        )

      case SCREENS.COLLECTIONS:
        Navigation.registerComponent(SCREENS.COLLECTIONS, () =>
          HOC(require('features/project/containers/Collections').default)
        )

      case SCREENS.EDIT_COLLECTION:
        Navigation.registerComponent(SCREENS.EDIT_COLLECTION, () =>
          HOC(require('features/project/containers/EditCollection').default)
        )

      case SCREENS.EDIT_PROJECT:
        Navigation.registerComponent(SCREENS.EDIT_PROJECT, () =>
          HOC(require('features/project/containers/EditProject').default)
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
          HOC(require('features/project/containers/AddProjectType').default)
        )
      default:
        return
    }
  })
}
