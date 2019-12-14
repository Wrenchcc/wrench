import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const DeleteNotificationMutation = gql`
  mutation deleteNotification($id: ID!) {
    deleteNotification(id: $id)
  }
`

// TODO: use update
const deleteNotificationOptions = {
  props: ({ mutate }) => ({
    deleteNotification: id =>
      mutate({
        variables: {
          id,
        },
        updateQueries: {
          getNotifications: prev => {
            const edges = prev.notifications.edges.filter(edge => edge.node.id !== id)

            return {
              ...prev,
              notifications: {
                ...prev.notifications,
                edges,
              },
            }
          },
        },
      }),
  }),
}

export const deleteNotification = graphql(DeleteNotificationMutation, deleteNotificationOptions)
