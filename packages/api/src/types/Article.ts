import gql from 'graphql-tag'

export default gql`
  type Article {
    id: ID
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    title: String
    description: String
    author: ArticleAuthor
    categories: ArticleCategories
    publisher: ArticlePublisher
    url: String
    filesConnection(
      first: Int = 10
      after: String
      reverse: Boolean
      type: FileType
    ): FileConnection
    commentsConnection(
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): CommentConnection
  }

  type ArticleConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [ArticleEdge!]
  }

  type ArticleCategories {
    id: ID
    name: String
  }

  type ArticlePublisher {
    id: ID
    slug: LowercaseString
    name: String
    url: String
    logoUrl: String
  }

  type ArticleAuthor {
    id: ID
    fullName: String
  }

  type ArticleEdge {
    cursor: String!
    node: Article!
  }

  extend type Query {
    article(id: ID): Article
    articles(first: Int = 10, after: String, last: Int = 10, before: String): ArticleConnection
  }
`
