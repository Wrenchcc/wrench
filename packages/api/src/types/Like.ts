import gql from 'graphql-tag'

export default gql`
  type Likes {
    totalCount: Int
    isLiked: Boolean
  }

  type LikeConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [LikeEdge!]
  }

  type LikeEdge {
    cursor: String!
    node: User!
  }

  extend type Mutation {
    likePost(id: ID!): Post
    likeComment(id: ID!): Comment
  }

  extend type Query {
    likes(
      postId: ID!
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): LikeConnection
  }
`
