export default `
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
    image
    video
	}

  type FileEdge {
    cursor: String!
    node: File!
  }

  extend type Query {
    files(first: Int, after: String, maxWidth: Int, maxHeight: Int, scale: Int, type: FileType): FileConnection
  }
`
