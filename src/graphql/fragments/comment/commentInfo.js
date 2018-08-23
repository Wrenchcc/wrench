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
          firstName
          lastName
          username
          avatarUrl
        }
        ...repliesConnection
      }
    }
  }
  ${repliesConnectionFragment}
`
