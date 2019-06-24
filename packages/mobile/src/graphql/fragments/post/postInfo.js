import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import commentsConnectionFragment from 'graphql/fragments/post/commentsConnection'

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
    }
    ...commentPostConnection
  }
  ${userInfoFragment}
  ${commentsConnectionFragment}
`
