import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import commentsConnectionFragment from 'graphql/fragments/post/commentsConnection'

// TODOD: Need projectPermissions, followers
export default gql`
  fragment postInfo on Post {
    id
    caption
    createdAt
    postPermissions {
      isOwner
    }
    user {
      ...userInfo
    }
    files: filesConnection(type: IMAGE) {
      edges {
        node {
          type
          id
          uri
        }
      }
    }
    project {
      id
      title
      slug
      projectPermissions {
        isOwner
        isFollower
      }
      followers: followersConnection {
        totalCount
      }
    }
    ...commentPostConnection
  }
  ${userInfoFragment}
  ${commentsConnectionFragment}
`
