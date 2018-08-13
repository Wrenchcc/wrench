import gql from 'graphql-tag'
import repliesConnectionFragment from 'graphql/fragments/comment/repliesConnection'

export default gql`
  fragment commentInfo on CommentConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        text
        createdAt
        user {
          fullName
          username
          avatarUrl
        }
        ...repliesConnection
      }
    }
  }
  ${repliesConnectionFragment}
`
