import gql from 'graphql-tag'

export default gql`
  type Meta {
    isAdmin: Boolean
    totalUsers: Int
    totalProjects: Int
    totalPosts: Int
    totalComments: Int
    totalFiles: Int
  }

  extend type Query {
    meta: Meta
  }
`
