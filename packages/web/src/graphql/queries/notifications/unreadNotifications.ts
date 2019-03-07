import gql from 'graphql-tag'

export const UNREAD_NOTIFICATIONS = gql`
  query unreadNotifications {
    notifications {
      unreadCount
    }
  }
`
