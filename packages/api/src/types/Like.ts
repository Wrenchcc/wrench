import gql from 'graphql-tag'

export default gql`
  type Likes {
    totalCount: Int
    isLiked: Boolean
  }

  extend type Mutation {
    likePost(id: ID!): Post
    likeComment(id: ID!): Comment
  }
`
