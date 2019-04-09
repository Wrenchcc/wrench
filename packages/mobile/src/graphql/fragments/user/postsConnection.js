import gql from 'graphql-tag'
import userInfoFragment from 'graphql-old/fragments/user/userInfo'
import projectInfoFragment from 'graphql-old/fragments/project/projectInfo'
import commentsConnectionFragment from 'graphql-old/fragments/post/commentsConnection'

export default gql`
  fragment userPostsConnection on User {
    posts: postsConnection(after: $after, first: 5) @connection(key: "posts") {
      edges {
        cursor
        node {
          id
          caption
          createdAt
          user {
            ...userInfo
          }
          postPermissions {
            isOwner
          }
          files: filesConnection(type: IMAGE) {
            edges {
              node {
                id
                type
                uri
              }
            }
          }
          project {
            ...projectInfo
          }
          ...commentPostConnection
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  ${userInfoFragment}
  ${projectInfoFragment}
  ${commentsConnectionFragment}
`
