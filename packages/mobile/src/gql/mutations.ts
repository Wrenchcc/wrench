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

// export const ADD_COMMENT_MUTATION = gql`
//   mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {
//     addComment(postId: $postId, commentId: $commentId, input: $input) {
//       commentId
//       id
//       text
//     }
//   }
// `
//
// export const DELETE_NOTIFICATION_MUTATION = gql`
//   mutation deleteNotification($id: ID!) {
//     deleteNotification(id: $id)
//   }
// `
//
// export const MARK_NOTIFICATION_SEEN_MUTATION = gql`
//   mutation markAllNotificationsSeen {
//     markAllNotificationsSeen
//   }
// `
//
// export const ADD_POST_MUTATION = gql`
//   mutation addPost($input: PostInput!) {
//     addPost(input: $input) {
//       ...postInfo
//     }
//   }
// `
//
// export const DELETE_POST_MUTATION = gql`
//   mutation deletePost($id: ID!) {
//     deletePost(id: $id) {
//       ...postInfo
//     }
//   }
// `
//
// export const EDIT_POST_MUTATION = gql`
//   mutation editPost($id: ID!, $input: EditPostInput!) {
//     editPost(id: $id, input: $input) {
//       ...postInfo
//     }
//   }
// `
//
// export const ADD_PROJECT_MUTATION = gql`
//   mutation addProject($input: ProjectInput!) {
//     addProject(input: $input) {
//       ...projectInfo
//     }
//   }
// `
//
// export const DELETE_PROJECT_MUTATION = gql`
//   mutation deleteProject($id: ID!) {
//     deleteProject(id: $id)
//   }
// `
//
// export const EDIT_PROJECT_MUTATION = gql`
//   mutation editProject($id: ID!, $input: ProjectInput!) {
//     editProject(id: $id, input: $input) {
//       id
//       title
//     }
//   }
// `
//
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
//
// export const AUTHENTICATE_FACEBOOK_MUTATION = gql`
//   mutation authenticateFacebook($token: String!) {
//     authenticateFacebook(token: $token) {
//       access_token
//       refresh_token
//     }
//   }
// `
//

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
