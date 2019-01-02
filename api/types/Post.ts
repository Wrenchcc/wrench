import gql from 'graphql-tag'

export default gql`
  type Post {
    id: ID
    createdAt: Date
    updatedAt: Date
    caption: String
    user: User
    project: Project
    postPermissions: PostPermissions

    filesConnection(
      first: Int
      after: String
      reverse: Boolean
      maxWidth: Int
      maxHeight: Int
      type: FileType
    ): FileConnection
    commentsConnection(first: Int, after: String, last: Int, before: String): CommentConnection
  }

  type PostPermissions {
    isOwner: Boolean
  }

  type PostConnection {
    totalCount: Int
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
    editPost(id: ID!, input: PostInput!): Post
  }
`
