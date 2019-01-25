import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { filter } from 'ramda'

const DeleteNotificationMutation = gql`
  mutation deleteNotification($id: ID!) {
    deleteNotification(id: $id)
  }
`

const deleteNotificationOptions = {
  props: ({ mutate }) => ({
    deleteNotification: id => mutate({
      variables: {
        id,
      },
      updateQueries: {
        getNotifications: prev => {
          const edges = filter(edge => edge.node.id !== id, prev.notifications.edges)

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
