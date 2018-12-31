import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { NotificationsUnreadCountQuery } from 'graphql/queries/getNotifications'

const MarkAllNotificationsSeenMutation = gql`
  mutation markAllNotificationsSeen {
    markAllNotificationsSeen
  }
`

const markAllNotificationsSeenOptions = {
  props: ({ mutate }) => ({
    markAllNotificationsSeen: () => mutate({
      update: store => {
        const data = store.readQuery({ query: NotificationsUnreadCountQuery })

        const notifications = {
          ...data,
          notifications: {
            ...data.notifications,
            unreadCount: 0,
          },
        }

        store.writeQuery({
          query: NotificationsUnreadCountQuery,
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
