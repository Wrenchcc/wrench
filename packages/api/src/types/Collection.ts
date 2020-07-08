import gql from 'graphql-tag'

export default gql`
  type Collection {
    id: ID
    name: String
    cover: CoverType
    createdAt: Date
    updatedAt: Date
  }

  type CollectionConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [CollectionEdge!]
  }

  type CollectionEdge {
    cursor: String!
    node: Collection!
  }

  extend type Mutation {
    addCollection(projectId: ID!, name: String!): Collection
    removeCollection(projectId: ID!, id: ID!): Collection
    collectPost(postId: ID!): Post
  }

  extend type Query {
    collections(
      id: ID!
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): PostConnection

    projectCollections(
      projectId: ID!
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): CollectionConnection
  }
`
