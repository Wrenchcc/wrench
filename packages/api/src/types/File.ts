import gql from 'graphql-tag'

export default gql`
  type File {
    id: ID
    postId: ID
    type: FileType
    uri: String!
    poster: String
    createdAt: Date
    updatedAt: Date
  }

  type FileConnection {
    edges: [FileEdge]
    pageInfo: PageInfo!
  }

  enum FileType {
    IMAGE
    VIDEO
  }

  enum SortType {
    RECENT
    RANDOM
  }

  type FileEdge {
    cursor: String!
    node: File!
  }

  extend type Query {
    files(first: Int = 10, after: String, type: FileType, sort: SortType): FileConnection
  }
`
