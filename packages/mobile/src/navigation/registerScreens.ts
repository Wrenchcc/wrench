import { Navigation } from 'react-native-navigation'
import { SCREENS } from './constants'
import createScreenHoc from './createScreenHoc'

export default function registerScreens(client) {
  const HOC = createScreenHoc(client)

  Navigation.setLazyComponentRegistrator((componentName) => {
    switch (componentName) {
      case SCREENS.ME: {
        const Screen = require('features/user/containers/Me').default

        Navigation.registerComponent(
          SCREENS.ME,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.PROJECT: {
        const Screen = require('features/project/containers/Project').default

        Navigation.registerComponent(
          SCREENS.PROJECT,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.EXPLORE: {
        const Screen = require('features/explore/containers/Explore').default

        Navigation.registerComponent(
          SCREENS.EXPLORE,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.FEED: {
        const Screen = require('features/feed/containers/Feed').default

        Navigation.registerComponent(
          SCREENS.FEED,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.USER: {
        const Screen = require('features/user/containers/User').default

        Navigation.registerComponent(
          SCREENS.USER,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.FOLLOWERS: {
        const Screen = require('features/project/containers/Followers').default

        Navigation.registerComponent(
          SCREENS.FOLLOWERS,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.POST: {
        const Screen = require('features/post/containers/Post').default

        Navigation.registerComponent(
          SCREENS.POST,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.COMMENTS: {
        const Screen = require('features/project/containers/Comments').default

        Navigation.registerComponent(
          SCREENS.COMMENTS,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.SIGN_IN: {
        const Screen = require('features/signIn/containers/SignIn').default

        Navigation.registerComponent(
          SCREENS.SIGN_IN,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.SETTINGS: {
        const Screen = require('features/user/containers/Settings').default

        Navigation.registerComponent(
          SCREENS.SETTINGS,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.EDIT_PROFILE: {
        const Screen = require('features/user/containers/EditProfile').default

        Navigation.registerComponent(
          SCREENS.EDIT_PROFILE,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.ADD_LOCATION: {
        const Screen = require('features/user/containers/AddLocation').default

        Navigation.registerComponent(
          SCREENS.ADD_LOCATION,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.OTHER_SIGN_IN_OPTIONS: {
        const Screen = require('features/signIn/containers/Other').default

        Navigation.registerComponent(
          SCREENS.OTHER_SIGN_IN_OPTIONS,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.PROJECT_SUGGESTIONS: {
        const Screen = require('features/signIn/containers/ProjectSuggestions').default

        Navigation.registerComponent(
          SCREENS.PROJECT_SUGGESTIONS,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.PUSH_NOTIFICATIONS: {
        const Screen = require('features/signIn/containers/PushNotifications').default

        Navigation.registerComponent(
          SCREENS.PUSH_NOTIFICATIONS,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.HASHTAG: {
        const Screen = require('features/explore/containers/Hashtag').default

        Navigation.registerComponent(
          SCREENS.HASHTAG,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.LIKES: {
        const Screen = require('features/explore/containers/Hashtag').default

        Navigation.registerComponent(
          SCREENS.LIKES,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.HALFPANEL: {
        Navigation.registerComponent(SCREENS.HALFPANEL, () =>
          HOC(require('navigation/Halfpanel').default)
        )
      }

      case SCREENS.BOOKMARKS: {
        const Screen = require('features/user/containers/Bookmarks').default

        Navigation.registerComponent(
          SCREENS.BOOKMARKS,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.INITIALIZING: {
        Navigation.registerComponent(
          SCREENS.INITIALIZING,
          () => require('navigation/Initializing').default
        )
      }

      case SCREENS.INSPIRATION: {
        const Screen = require('features/explore/containers/Inspiration').default

        Navigation.registerComponent(
          SCREENS.INSPIRATION,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.EMPTY: {
        Navigation.registerComponent(SCREENS.EMPTY, () => () => null)
      }

      case SCREENS.MENTION: {
        const Screen = require('components/Mention').default

        Navigation.registerComponent(
          SCREENS.MENTION,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.WEBVIEW: {
        const Screen = require('components/WebView').default

        Navigation.registerComponent(
          SCREENS.WEBVIEW,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.EDIT_POST: {
        const Screen = require('components/EditPost').default

        Navigation.registerComponent(
          SCREENS.EDIT_POST,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.CATEGORIES: {
        const Screen = require('features/explore/containers/Categories').default

        Navigation.registerComponent(
          SCREENS.CATEGORIES,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.ONBOARDING: {
        const Screen = require('features/signIn/containers/Onboarding').default

        Navigation.registerComponent(
          SCREENS.ONBOARDING,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.SIGN_IN: {
        const Screen = require('features/signIn/containers/SignIn').default

        Navigation.registerComponent(
          SCREENS.SIGN_IN,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.NOTIFICATIONS: {
        const Screen = require('features/notifications/containers/Notifications').default

        Navigation.registerComponent(
          SCREENS.NOTIFICATIONS,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.ADD_MEDIA: {
        const Screen = require('features/project/containers/AddMedia').default

        Navigation.registerComponent(
          SCREENS.ADD_MEDIA,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.ADD_PROJECT: {
        const Screen = require('features/project/containers/AddProject').default

        Navigation.registerComponent(
          SCREENS.ADD_PROJECT,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.ADD_POST: {
        const Screen = require('features/project/containers/AddPost').default

        Navigation.registerComponent(
          SCREENS.ADD_POST,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.ADD_POST_TO_COLLECTION: {
        const Screen = require('features/project/containers/AddPostToCollection').default

        Navigation.registerComponent(
          SCREENS.ADD_POST_TO_COLLECTION,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.COLLECTIONS: {
        const Screen = require('features/project/containers/Collections').default

        Navigation.registerComponent(
          SCREENS.COLLECTIONS,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.EDIT_COLLECTION: {
        const Screen = require('features/project/containers/EditCollection').default

        Navigation.registerComponent(
          SCREENS.EDIT_COLLECTION,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.EDIT_PROJECT: {
        const Screen = require('features/project/containers/EditProject').default

        Navigation.registerComponent(
          SCREENS.EDIT_PROJECT,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.EDIT_MODEL: {
        const Screen = require('features/project/containers/EditModel').default

        Navigation.registerComponent(
          SCREENS.EDIT_MODEL,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.ADD_PROJECT_MODEL: {
        const Screen = require('features/project/containers/AddProjectModel').default

        Navigation.registerComponent(
          SCREENS.ADD_PROJECT_MODEL,
          () => HOC(Screen),
          () => Screen
        )
      }

      case SCREENS.ADD_PROJECT_TYPE: {
        const Screen = require('features/project/containers/AddProjectType').default

        Navigation.registerComponent(
          SCREENS.ADD_PROJECT_TYPE,
          () => HOC(Screen),
          () => Screen
        )
      }

      default:
        return
    }
  })
}
