import gql from 'graphql-tag'
import * as fragment from './fragments'

export const TOGGLE_NOTIFICATION_SETTINGS_MUTATION = gql`
  mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {
    toggleNotificationSettings(input: $input) {
      ...userSettingsFragment
    }
  }
  ${fragment.USER_SETTINGS_FRAGMENT}
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`

export const LIKE_POST_MUTATION = gql`
  mutation likePost($id: ID!) {
    likePost(id: $id) {
      id
      likes {
        isLiked
        totalCount
      }
    }
  }
`

export const LIKE_COMMENT_MUTATION = gql`
  mutation likeComment($id: ID!) {
    likeComment(id: $id) {
      id
      likes {
        isLiked
        totalCount
      }
    }
  }
`

export const EDIT_POST_MUTATION = gql`
  mutation editPost($id: ID!, $input: EditPostInput!) {
    editPost(id: $id, input: $input) {
      ...postFragment
    }
  }
  ${fragment.POST_FRAGMENT}
`

export const FOLLOW_PROJECT_MUTATION = gql`
  mutation followProject($id: ID!) {
    followProject(id: $id) {
      cover {
        uri
      }
      ...projectFragment
    }
  }
  ${fragment.PROJECT_FRAGMENT}
`

export const PRE_SING_URLS_MUTATION = gql`
  mutation($input: [PreSignedUrlnput]!) {
    preSignUrls(input: $input) {
      url
      type
      filename
    }
  }
`

export const PRE_SING_URL_MUTATION = gql`
  mutation($input: PreSignedUrlInput!) {
    preSignUrl(input: $input) {
      url
      type
      filename
    }
  }
`

export const EDIT_USER_MUTATION = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
      ...currentUserFragment
    }
  }
  ${fragment.CURRENT_USER_FRAGMENT}
`

export const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken($refreshToken: String!) {
    token: refreshToken(refreshToken: $refreshToken) {
      access_token
    }
  }
`

export const REGISTER_DEVICE_TOKEN_MUTATION = gql`
  mutation registerDeviceToken($token: String!, $platform: PlatformType!) {
    registerDeviceToken(token: $token, platform: $platform)
  }
`
