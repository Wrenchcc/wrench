import gql from 'graphql-tag'

export default gql`
  type Post @cacheControl(maxAge: 180) {
    id: ID
    createdAt: Date
    updatedAt: Date
    caption: String
    user: User
    project: Project
    postPermissions: PostPermissions # @deprecated(reason: "Use permissions.")
    permissions: PostPermissions
    likes: Likes
    bookmarks: Bookmarks
    collection: Collection
    translatable: Boolean
    language: String

    filesConnection(
      first: Int = 10
      after: String
      reverse: Boolean
      type: FileType
    ): FileConnection
    commentsConnection(
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): CommentConnection

    likesConnection(first: Int = 10, after: String, last: Int = 10, before: String): LikeConnection
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

  input EditFileInput {
    id: String
  }

  extend type Query {
    post(id: ID): Post
    posts(first: Int = 10, after: String, last: Int = 10, before: String): PostConnection
      @cacheControl(maxAge: 360)
  }

  input PostInput {
    projectId: ID!
    caption: String
    files: [FileInput]!
    collectionId: ID
  }

  input EditPostInput {
    caption: String
    collectionId: ID
    files: [EditFileInput]!
  }

  extend type Mutation {
    deletePost(id: ID!): Post
    addPost(input: PostInput!): Post
    editPost(id: ID!, input: EditPostInput!): Post
    translatePost(id: ID!, original: Boolean): Post
  }
`
