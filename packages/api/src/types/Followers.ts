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
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): FollowersConnection
  }
`
