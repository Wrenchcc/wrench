import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import commentsConnectionFragment from 'graphql/fragments/post/commentsConnection'

export default gql`
  fragment projectPostsConnection on Project {
    posts: postsConnection(after: $after) {
      edges {
        cursor
        node {
          id
          caption
          isAuthor
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
            id
            title
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
