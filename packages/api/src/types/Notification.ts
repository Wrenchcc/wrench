import gql from 'graphql-tag'

export default gql`
  type Notification {
    id: ID!
    user: User!
    type: NotificationTypes
    project: Project
    post: Post
    comment: Comment
    isSeen: Boolean!
    createdAt: Date!
    updatedAt: Date!

    filesConnection(
      first: Int = 10
      after: String
      reverse: Boolean
      type: FileType
    ): FileConnection
  }

  enum NotificationTypes {
    NEW_COMMENT
    NEW_FOLLOWER
    NEW_POST_LIKE
    NEW_COMMENT_LIKE
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
    deleteNotification(id: ID!): Boolean
  }
`
