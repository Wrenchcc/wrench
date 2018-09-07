export default `
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
    isAdmin: Boolean
    isPro: Boolean!
    interestedIn: [ProjectCategory]
    settings: UserSettings
    dynamicLink: String

    projectsConnection(first: Int, after: String, last: Int, before: String): ProjectsConnection
    followingProjects(first: Int, after: String, last: Int, before: String): ProjectsConnection
    postsConnection(first: Int, after: String, last: Int, before: String): PostConnection
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
    push: Boolean
    email: Boolean
  }

  type NotificationSettingsType {
    newFollower: NotificationKindSettings
    newComment: NotificationKindSettings
    newMention: NotificationKindSettings
    newArticle: NotificationKindSettings
    similarProjects: NotificationKindSettings
    productAnnouncements: NotificationKindSettings
  }

  type UserNotificationsSettings {
    types: NotificationSettingsType
  }

  type UserSettings {
   notifications: UserNotificationsSettings
 }

  extend type Query {
    user(id: ID, username: LowercaseString): User
    users(first: Int, after: String, last: Int, before: String): UserConnection
    currentUser(first: Int, after: String, last: Int, before: String): User
  }

  input EditUserInput {
    interestedIn: [ProjectCategoryInput]
  }

  input ToggleNotificationSettingsInput {
    deliveryMethod: String!
    notificationType: String!
 }

  extend type Mutation {
    editUser(input: EditUserInput!): User
    toggleNotificationSettings(input: ToggleNotificationSettingsInput): User
  }
`;
