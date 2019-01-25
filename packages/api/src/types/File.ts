import gql from 'graphql-tag'

export default gql`
  type File {
    id: ID
    type: FileType
    uri: String!
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

  type FileEdge {
    cursor: String!
    node: File!
  }

  extend type Query {
    files(
      first: Int = 10
      after: String
      maxWidth: Int
      maxHeight: Int
      scale: Int
      type: FileType
    ): FileConnection
  }
`
