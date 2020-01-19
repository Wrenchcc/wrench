import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { NotificationsDocument } from '@wrench/common'

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
          const data = cache.readQuery({ query: NotificationsDocument })

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
