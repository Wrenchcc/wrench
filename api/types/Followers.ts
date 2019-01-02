import gql from 'graphql-tag'

export default gql`
  type FollowersConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [FollowersEdge!]
  }

  type FollowersEdge {
    cursor: String!
    node: User!
  }

  extend type Query {
    followers(
      projectId: ID!
      first: Int
      after: String
      last: Int
      before: String
    ): FollowersConnection
  }
`
