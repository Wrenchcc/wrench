export default `
  type Reply {
    id: ID
    createdAt: Date
    updatedAt: Date
    text: String
    user: User
  }

  type ReplyConnection {
    pageInfo: PageInfo!
    edges: [ReplyEdge!]
  }

  type ReplyEdge {
    cursor: String!
    node: Reply!
  }

  extend type Query {
    replies(commentId: ID!, first: Int, after: String, last: Int, before: String): ReplyConnection
  }
`
