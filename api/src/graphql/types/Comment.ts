export default `
  type Comment {
    id: ID
    createdAt: Date
    updatedAt: Date
    text: String
    user: User
    repliesConnection(first: Int, after: String, last: Int, before: String): ReplyConnection
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

  extend type Query {
    comments(postId: ID!, first: Int, after: String, last: Int, before: String): CommentConnection
  }
`
