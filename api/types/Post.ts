export default `
  type Post {
    id: ID
    type: PostType
    createdAt: Date
    updatedAt: Date
    caption: String
    user: User
    project: Project
    isAuthor: Boolean

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

  input FileInput {
    filename: String!
  }

  extend type Query {
    post(id: ID!): Post
    posts(userId: ID, first: Int, after: String, last: Int, before: String): PostConnection
  }

  input PostInput {
    projectId: ID!
    caption: String
    files: [FileInput]
  }

  extend type Mutation {
    deletePost(id: ID!): Boolean
    addPost(input: PostInput!): Post
  }
`
