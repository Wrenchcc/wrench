import gql from 'graphql-tag'

export const FOLLOW_PROJECT_MUTATION = gql`
  mutation followProject($id: ID!) {
    followProject(id: $id) {
      id
      title
      slug
      cover {
        uri
      }
      permissions {
        isOwner
        isFollower
      }
      followers: followersConnection {
        totalCount
      }
      user {
        id
        fullName
        username
        isOnline
      }
    }
  }
`
