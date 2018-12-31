import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'

const MarkAllNotificationsSeenMutation = gql`
  mutation markAllNotificationsSeen {
    markAllNotificationsSeen
  }
`

const markAllNotificationsSeenOptions = {
  props: ({ mutate }) => ({
    markAllNotificationsSeen: () => mutate({
      update: store => {
        const data = store.readQuery({ query: CurrentUserQuery })

        const user = {
          ...data,
          user: {
            ...data.user,
            unreadNotifications: 0,
          },
        }

        store.writeQuery({
          query: CurrentUserQuery,
          data: user,
        })
      },
    }),
  }),
}

export const markAllNotificationsSeen = graphql(
  MarkAllNotificationsSeenMutation,
  markAllNotificationsSeenOptions
)
