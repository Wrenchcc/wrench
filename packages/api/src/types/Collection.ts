import gql from 'graphql-tag'

export default gql`
  type Collection {
    id: ID
    name: String
    slug: String
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

  input CollectionInput {
    postId: ID!
  }

  input EditCollectionInput {
    name: String
  }

  extend type Mutation {
    addCollection(projectId: ID!, name: String!): Collection
    deleteCollection(projectId: ID!, id: ID!): Collection
    editCollection(id: ID!, input: EditCollectionInput!): Collection
    collectPosts(projectId: ID!, collectionId: ID!, input: [CollectionInput]): Collection
  }

  extend type Query {
    collections(
      id: ID
      slug: LowercaseString
      projectId: ID
      projectSlug: LowercaseString
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): PostConnection

    projectCollections(
      slug: LowercaseString
      projectId: ID
      projectSlug: LowercaseString
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): CollectionConnection
  }
`
