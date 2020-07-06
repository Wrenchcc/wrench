import gql from 'graphql-tag'

export default gql`
  type BookmarkConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [BookmarkEdge!]
  }

  type Bookmarks {
    totalCount: Int
    isBookmarked: Boolean
  }

  type BookmarkEdge {
    cursor: String!
    node: Post!
  }

  extend type Mutation {
    bookmarkPost(id: ID!): Post
  }

  extend type Query {
    bookmarks(first: Int = 10, after: String, last: Int = 10, before: String): BookmarkConnection
  }
`
