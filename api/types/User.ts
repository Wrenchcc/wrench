import gql from 'graphql-tag'

export default gql`
  type User {
    id: ID!
    username: LowercaseString
    createdAt: Date!
    updatedAt: Date!
    fullName: String
    firstName: String
    lastName: String
    avatarUrl: String
    projectCount: Int
    interestedIn: [ProjectType]
    settings: UserSettings
    dynamicLink: String
    isOnline: Boolean
    lastSeen: Date

    projectsConnection(
      first: Int = 10
      after: String
      last: Int
      before: String
    ): ProjectsConnection
    followingProjects(first: Int = 10, after: String, last: Int, before: String): ProjectsConnection
    postsConnection(first: Int = 10, after: String, last: Int, before: String): PostConnection
  }

  type UserConnection {
    pageInfo: PageInfo
    edges: [UserEdge]
  }

  type UserEdge {
    cursor: String
    node: User
  }

  type NotificationSettingsType {
    NEW_FOLLOWER: Boolean
    NEW_COMMENT: Boolean
    NEW_MENTION: Boolean
    NEW_ARTICLE: Boolean
    SIMILAR_PROJECTS: Boolean
    PRODUCT_ANNOUNCEMENTS: Boolean
  }

  type UserNotificationsSettings {
    types: NotificationSettingsType
  }

  type UserSettings {
    locale: String
    notifications: UserNotificationsSettings
  }

  extend type Query {
    user(id: ID, username: LowercaseString): User
    users(first: Int = 10, after: String, last: Int, before: String): UserConnection
    currentUser(first: Int = 10, after: String, last: Int, before: String): User
  }

  input EditUserInput {
    interestedIn: [ProjectTypeInput]
    locale: String
  }

  input ToggleNotificationSettingsInput {
    notificationType: String!
  }

  extend type Mutation {
    editUser(input: EditUserInput!): User
    toggleNotificationSettings(input: ToggleNotificationSettingsInput): User
    registerDeviceToken(token: String!, platform: PlatformType!): Boolean
  }
`
