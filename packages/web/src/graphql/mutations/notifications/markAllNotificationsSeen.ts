import gql from 'graphql-tag'

export const MARK_ALL_NOTIFICATIONS_SEEN = gql`
  mutation markAllNotificationsSeen {
    markAllNotificationsSeen
  }
`
