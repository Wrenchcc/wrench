import gql from 'graphql-tag'

export default gql`
  type Project @cacheControl(maxAge: 3600) {
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
    cover: CoverType
    model: Model

    filesConnection(
      after: String
      first: Int = 10
      reverse: Boolean
      type: FileType
    ): FileConnection @cacheControl(maxAge: 180)

    followersConnection(
      after: String
      before: String
      first: Int = 10
      last: Int = 10
    ): FollowersConnection @cacheControl(maxAge: 180)

    postsConnection(first: Int = 10, after: String, last: Int = 10, before: String): PostConnection
      @cacheControl(maxAge: 180)

    collectionsConnection(
      after: String
      before: String
      first: Int = 10
      last: Int = 10
    ): CollectionConnection @cacheControl(maxAge: 180)
  }

  type CoverType {
    uri: String
    default: Boolean
  }

  type ProjectPermissions {
    isFollower: Boolean
    isOwner: Boolean
  }

  enum ProjectSortType {
    POPULAR
    RECENT
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
      typeId: ID
    ): ProjectsConnection

    projectSuggestions(
      after: String
      before: String
      first: Int = 10
      last: Int = 10
    ): [ProjectSuggestionsConnection]

    similarProjects(
      id: ID!
      after: String
      before: String
      first: Int = 10
      last: Int = 10
    ): ProjectsConnection

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
