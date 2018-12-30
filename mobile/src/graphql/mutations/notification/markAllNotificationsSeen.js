import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const MarkAllNotificationsSeenMutation = gql`
  mutation markAllNotificationsSeen {
    markAllNotificationsSeen
  }
`

const markAllNotificationsSeenOptions = {
  props: ({ mutate }) => ({
    markAllNotificationsSeen: () => mutate({
      optimisticResponse: {
        __typename: 'Mutation',
        markAllNotificationsSeen: {
          __typename: 'User',
          id: 'dd219e11-1722-43da-99da-c777c3b5f2fc',
          unreadNotifications: 0,
        },
      },
    }),
  }),
}

export const markAllNotificationsSeen = graphql(
  MarkAllNotificationsSeenMutation,
  markAllNotificationsSeenOptions
)
