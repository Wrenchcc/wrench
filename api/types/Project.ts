export default `
  type Project {
    id: ID
    slug: String
    title: String
    createdAt: Date
    updatedAt: Date
    dynamicLink: String
    user: User
    projectPermissions: ProjectPermissions

    filesConnection(first: Int, after: String, reverse: Boolean, maxWidth: Int, maxHeight: Int, type: FileType): FileConnection
    followersConnection(first: Int, after: String, last: Int, before: String): FollowersConnection
    postsConnection(first: Int, after: String, last: Int, before: String): PostConnection
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
    project(id: ID, slug: LowercaseString, first: Int, after: String, last: Int, before: String): Project
    projects(first: Int, after: String, last: Int, before: String, type: ProjectSortType): ProjectsConnection
    projectSuggestions(first: Int, after: String, last: Int, before: String): [ProjectSuggestionsConnection]
    projectTypes: [ProjectType]
  }

  input ProjectTypeInput {
    id: ID
  }

  input ProjectInput {
    title: String!
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
