import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import commentConnectionFragment from 'graphql/fragments/post/commentConnection'

export default gql`
  fragment userPostsConnection on User {
    posts: postsConnection(after: $after) {
      edges {
        cursor
        node {
          id
          caption
          user {
            ...userInfo
          }
          images: imagesConnection {
            edges {
              node {
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
  ${commentConnectionFragment}
`
