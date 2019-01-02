import gql from 'graphql-tag'

export default gql`
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
    NEW_REPLY
  }

  type NotificationsConnection {
    unreadCount: Int
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
