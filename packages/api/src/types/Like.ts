import gql from 'graphql-tag'

export default gql`
  type Likes {
    totalCount: Int
    isLiked: Boolean
  }

  type Like {
    id: ID
    createdAt: Date
    updatedAt: Date
    user: User
  }

  type LikeConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [LikeEdge!]
  }

  type LikeEdge {
    cursor: String!
    node: Like!
  }

  extend type Mutation {
    likePost(id: ID!): Post
    likeComment(id: ID!): Comment
  }
`
