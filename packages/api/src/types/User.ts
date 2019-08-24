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
      last: Int = 10
      before: String
    ): ProjectsConnection
    followingProjects(
      first: Int = 10
      after: String
      last: Int = 10
      before: String
    ): ProjectsConnection
    postsConnection(first: Int = 10, after: String, last: Int = 10, before: String): PostConnection
  }

  type UserConnection {
    pageInfo: PageInfo
    edges: [UserEdge]
  }

  type UserEdge {
    cursor: String
    node: User
  }

  type NotificationKindSettings {
    email: Boolean
    push: Boolean
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
    timezone: String
    notifications: UserNotificationsSettings
  }

  extend type Query {
    user(id: ID, username: LowercaseString): User
    users(first: Int = 10, after: String, last: Int = 10, before: String): UserConnection
    currentUser(first: Int = 10, after: String, last: Int = 10, before: String): User
  }

  input EditUserInput {
    interestedIn: [ProjectTypeInput]
    timezone: String
    locale: String
  }

  input ToggleNotificationSettingsInput {
    deliveryMethod: String!
    notificationType: String!
  }

  extend type Mutation {
    editUser(input: EditUserInput!): User
    toggleNotificationSettings(input: ToggleNotificationSettingsInput): User
    registerDeviceToken(token: String!, platform: PlatformType!): Boolean
  }
`
