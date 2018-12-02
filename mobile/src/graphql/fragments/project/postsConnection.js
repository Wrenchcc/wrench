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
  ${commentsConnectionFragment}
`
