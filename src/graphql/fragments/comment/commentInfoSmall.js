import gql from 'graphql-tag'

export default gql`
  fragment commentInfoSmall on CommentConnection {
    totalCount
    edges {
      node {
        id
        text
        user {
          fullName
        }
      }
    }
  }
`
