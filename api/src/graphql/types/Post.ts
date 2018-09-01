export default `
  type Post {
    id: ID
    type: PostType
    createdAt: Date
    updatedAt: Date
    caption: String
    videos: String
    user: User
    project: Project

    imagesConnection(first: Int, after: String, reverse: Boolean, maxWidth: Int, maxHeight: Int): ImageConnection!
    commentConnection(first: Int, after: String, last: Int, before: String): CommentConnection
  }

  enum PostType {
    IMAGE
    VIDEO
	}

  type PostConnection {
    pageInfo: PageInfo!
    edges: [PostEdge!]
  }

  type PostEdge {
    cursor: String!
    node: Post!
  }

  extend type Query {
    post(id: ID!): Post
    posts(userId: ID, first: Int, after: String, last: Int, before: String): PostConnection
  }
`
