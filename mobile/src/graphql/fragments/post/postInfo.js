import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import commentsConnectionFragment from 'graphql/fragments/post/commentsConnection'

export default gql`
  fragment postInfo on Post {
    id
    caption
    postPermissions {
      isOwner
    }
    user {
      ...userInfo
    }
    files: filesConnection {
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
