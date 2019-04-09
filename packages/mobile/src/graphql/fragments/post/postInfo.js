import gql from 'graphql-tag'
import userInfoFragment from 'graphql-old/fragments/user/userInfo'
import projectInfoFragment from 'graphql-old/fragments/project/projectInfo'
import commentsConnectionFragment from 'graphql-old/fragments/post/commentsConnection'

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
      ...projectInfo
    }
    ...commentPostConnection
  }
  ${userInfoFragment}
  ${projectInfoFragment}
  ${commentsConnectionFragment}
`
