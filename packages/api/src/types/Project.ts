import gql from 'graphql-tag'

export default gql`
  type Project {
    id: ID
    slug: String
    title: String
    createdAt: Date
    updatedAt: Date
    dynamicLink: String
    user: User
    projectPermissions: ProjectPermissions # @deprecated(reason: "Use permissions.")
    permissions: ProjectPermissions
    commentsDisabled: Boolean
    type: ProjectType

    filesConnection(
      after: String
      first: Int = 10
      reverse: Boolean
      type: FileType
    ): FileConnection

    followersConnection(
      after: String
      before: String
      first: Int = 10
      last: Int = 10
    ): FollowersConnection

    postsConnection(first: Int = 10, after: String, last: Int = 10, before: String): PostConnection
  }

  type ProjectPermissions {
    isFollower: Boolean
    isOwner: Boolean
  }

  enum ProjectSortType {
    POPULAR
  }

  type ProjectType {
    id: ID
    title: String
    slug: String
    imageUrl: String!
  }

  type ProjectsConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [ProjectEdge!]
  }

  type ProjectSuggestionsConnection {
    totalCount: Int
    type: ProjectType
    pageInfo: PageInfo!
    edges: [ProjectEdge!]
  }

  type ProjectEdge {
    cursor: String!
    node: Project!
  }

  extend type Query {
    project(id: ID, slug: LowercaseString): Project

    projects(
      after: String
      before: String
      first: Int = 10
      last: Int = 10
      type: ProjectSortType!
    ): ProjectsConnection

    projectSuggestions(
      after: String
      before: String
      first: Int = 10
      last: Int = 10
    ): [ProjectSuggestionsConnection]

    projectTypes: [ProjectType]
  }

  input ProjectTypeInput {
    id: ID
  }

  input ProjectInput {
    title: String
    commentsDisabled: Boolean
    projectTypeId: ID
    modelId: ID
  }

  extend type Mutation {
    followProject(id: ID!): Project
    addProject(input: ProjectInput!): Project
    editProject(id: ID!, input: ProjectInput!): Project
    deleteProject(id: ID!): Boolean
  }
`
