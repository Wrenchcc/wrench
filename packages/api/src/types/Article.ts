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
    publisher: Publisher
    url: String

    filesConnection(
      first: Int = 10
      after: String
      reverse: Boolean
      type: FileType
    ): FileConnection

    categoriesConnection(
      first: Int = 10
      after: String
      reverse: Boolean
      type: FileType
    ): ArticleCategoryConnection
  }

  type ArticleConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [ArticleEdge!]
  }

  type ArticleCategoryConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [ArticleCategoryEdge!]
  }

  type ArticleCategory {
    id: ID
    name: String
    slug: LowercaseString
  }

  type ArticleCategoryEdge {
    cursor: String!
    node: ArticleCategory!
  }

  type ArticleAuthor {
    id: ID
    fullName: String
  }

  type ArticleEdge {
    cursor: String!
    node: Article!
  }

  input ArticleInput {
    files: [String]!
    publisher: String!
    categories: [String]!
    author: String!
    createdAt: Date!
    description: String!
    title: String!
    url: String!
  }

  extend type Query {
    article(id: ID): Article
    articles(
      publisherId: ID
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): ArticleConnection
  }

  extend type Mutation {
    addArticle(input: ArticleInput!): Article
  }
`
