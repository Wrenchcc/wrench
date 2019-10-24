import gql from 'graphql-tag'

export default gql`
  type User @cacheControl(maxAge: 600) {
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
    website: String
    bio: String
    location: String
    isSilhouette: Boolean

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
    NEW_FOLLOWER: NotificationKindSettings
    NEW_COMMENT: NotificationKindSettings
    NEW_MENTION: NotificationKindSettings
    NEW_ARTICLE: NotificationKindSettings
    SIMILAR_PROJECTS: NotificationKindSettings
    PRODUCT_ANNOUNCEMENTS: NotificationKindSettings
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
    user(id: ID, username: LowercaseString): User @cacheControl(maxAge: 1200)
    users(first: Int = 10, after: String, last: Int = 10, before: String): UserConnection
      @cacheControl(maxAge: 1200)
    currentUser(first: Int = 10, after: String, last: Int = 10, before: String): User
      @cacheControl(maxAge: 1200, scope: PRIVATE)
  }

  input EditUserInput {
    firstName: String
    lastName: String
    interestedIn: [ProjectTypeInput]
    timezone: String
    locale: String
    location: String
    bio: String
    website: String
    avatarUrl: String
  }

  input ToggleNotificationSettingsInput {
    deliveryMethod: String!
    notificationType: String!
  }

  extend type Mutation {
    editUser(input: EditUserInput!): User
    toggleNotificationSettings(input: ToggleNotificationSettingsInput): User
    registerDeviceToken(token: String!, platform: PlatformType!): Boolean
    banUser(userId: ID!): Boolean
    deleteCurrentUser: Boolean
  }
`
