import gql from 'graphql-tag'

export default gql`
  type Hashtag @cacheControl(maxAge: 3600) {
    id: ID
    name: String
    slug: LowercaseString
    totalCount: Int
    createdAt: Date
    updatedAt: Date

    postsConnection(first: Int = 10, after: String, last: Int = 10, before: String): PostConnection
      @cacheControl(maxAge: 360)
  }

  type HashtagConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [HashtagEdge!]
  }

  type HashtagEdge {
    cursor: String!
    node: Hashtag!
  }

  extend type Query {
    hashtag(id: ID, slug: LowercaseString, name: String): Hashtag
  }
`
