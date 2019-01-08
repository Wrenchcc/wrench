import gql from 'graphql-tag'

export default gql`
  type Comment {
    id: ID
    createdAt: Date
    updatedAt: Date
    text: String!
    user: User
    postId: ID
    repliesConnection(first: Int = 10, after: String, last: Int = 10, before: String): CommentConnection
  }

  type CommentConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [CommentEdge!]
  }

  type CommentEdge {
    cursor: String!
    node: Comment!
  }

  input CommentInput {
    text: String!
  }

  extend type Mutation {
    addComment(postId: ID!, commentId: ID, input: CommentInput!): Comment
    editComment(id: ID!, input: CommentInput!): Comment
    deleteComment(id: ID!): Boolean
  }

  extend type Query {
    comments(postId: ID!, first: Int = 10, after: String, last: Int = 10, before: String): CommentConnection
  }
`
