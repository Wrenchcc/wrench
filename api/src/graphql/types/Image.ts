export default `
  type Image {
    id: ID
    uri: String!
    createdAt: Date
    updatedAt: Date
  }

  type ImageConnection {
    edges: [ImageEdge!]!
    pageInfo: PageInfo!
  }

  type ImageEdge {
    cursor: String!
    node: Image!
  }

  extend type Query {
    images(first: Int, after: String, maxWidth: Int, maxHeight: Int, scale: Int): ImageConnection
  }
`
