export default `
  type Notification {
    id: ID!
    user: User!
    type: NotificationTypes
    project: Project
    comment: Comment
    isSeen: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  enum NotificationTypes {
    NEW_COMMENT
    NEW_FOLLOWER
    NEW_MENTION
	}

  type NotificationsConnection {
		pageInfo: PageInfo
		edges: [NotificationEdge]
	}

  type NotificationEdge {
		cursor: String
		node: Notification
	}

  extend type Query {
		notifications(first: Int = 10, after: String): NotificationsConnection
	}

  extend type Mutation {
		markAllNotificationsSeen: Boolean
	}
`
