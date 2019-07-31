import gql from 'graphql-tag'

export default gql`
  type Publisher {
    id: ID
    slug: LowercaseString
    name: String
    url: String
    logoUrl: String
    seen: Boolean

    articlesConnection(
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): ArticleConnection
  }

  type PublisherConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [PublisherEdge!]
  }

  type PublisherEdge {
    cursor: String!
    node: Publisher!
  }

  extend type Query {
    publisher(id: ID): Publisher
    publishers(first: Int = 10, after: String, last: Int = 10, before: String): PublisherConnection
  }
`
