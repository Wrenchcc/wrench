import gql from 'graphql-tag'

export default gql`
  type Feed {
    postsConnection(first: Int = 10, after: String, last: Int = 10, before: String): PostConnection
  }

  extend type Query {
    feed: Feed
  }
`
