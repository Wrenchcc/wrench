import gql from 'graphql-tag'

export default gql`
  type Meta {
    isAdmin: Boolean
    totalUsers: Int
    totalProjects: Int
    totalPosts: Int
    totalComments: Int
    totalFiles: Int
    totalUsersToday: Int
    totalProjectsToday: Int
    totalPostsToday: Int
    totalCommentsToday: Int
    totalFilesToday: Int
  }

  enum GrowthType {
    PROJECTS
    USERS
  }

  type GrowthData {
    date: Date
    count: Int
  }

  extend type Query {
    meta: Meta
    growth(type: GrowthType!, startDate: Date, endDate: Date): [GrowthData]
  }
`
