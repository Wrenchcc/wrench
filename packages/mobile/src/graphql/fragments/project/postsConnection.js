import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import commentsConnectionFragment from 'graphql/fragments/post/commentsConnection'

export default gql`
  fragment projectPostsConnection on Project {
    posts: postsConnection(after: $after) @connection(key: "posts") {
      edges {
        cursor
        node {
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
            commentsDisabled
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
  ${commentsConnectionFragment}
`
