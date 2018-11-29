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

    imagesConnection(first: Int, after: String, reverse: Boolean, maxWidth: Int, maxHeight: Int): ImageConnection
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
    imageUrl: String!
  }

  type ProjectsConnection {
    pageInfo: PageInfo!
    edges: [ProjectEdge!]
  }

  type ProjectSuggestionsConnection {
    category: ProjectType
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

  extend type Mutation {
    followProject(id: ID!): Project
  }
`
