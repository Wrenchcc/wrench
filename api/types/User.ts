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
    interestedIn: [ProjectType]
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

  type NotificationSettingsType {
    newFollower: Boolean
    newComment: Boolean
    newMention: Boolean
    newArticle: Boolean
    similarProjects: Boolean
    productAnnouncements: Boolean
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
    interestedIn: [ProjectTypeInput]
  }

  input ToggleNotificationSettingsInput {
    notificationType: String!
 }

  extend type Mutation {
    editUser(input: EditUserInput!): User
    toggleNotificationSettings(input: ToggleNotificationSettingsInput): User
  }
`
