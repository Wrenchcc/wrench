import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { NotificationsQuery } from 'graphql/queries/getNotifications'

const MarkAllNotificationsSeenMutation = gql`
  mutation markAllNotificationsSeen {
    markAllNotificationsSeen
  }
`

const markAllNotificationsSeenOptions = {
  props: ({ mutate }) => ({
    markAllNotificationsSeen: () =>
      mutate({
        update: cache => {
          const data = cache.readQuery({ query: NotificationsQuery })

          const notifications = {
            ...data,
            notifications: {
              ...data.notifications,
              unreadCount: 0,
            },
          }

          cache.writeQuery({
            query: NotificationsQuery,
            data: notifications,
          })
        },
      }),
  }),
}

export const markAllNotificationsSeen = graphql(
  MarkAllNotificationsSeenMutation,
  markAllNotificationsSeenOptions
)
