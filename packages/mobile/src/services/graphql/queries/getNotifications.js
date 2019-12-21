import gql from 'graphql-tag'
import ms from 'ms'
import { graphql } from 'react-apollo'
import { mapListProps } from 'services/graphql/utils/mapListProps'
import userInfoFragment from 'services/graphql/fragments/user/userInfo'
import projectInfoFragment from 'services/graphql/fragments/project/projectInfo'

export const NotificationsQuery = gql`
  query getNotifications($after: String) {
    notifications(after: $after) @connection(key: "notifications") {
      unreadCount
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          type
          createdAt
          user {
            ...userInfo
          }
          project {
            ...projectInfo
          }
          post {
            id
          }
          comment {
            id
            text
            postId
          }
          files: filesConnection(type: IMAGE, first: 1) {
            edges {
              node {
                id
                uri
              }
            }
          }
        }
      }
    }
  }
  ${userInfoFragment}
  ${projectInfoFragment}
`

const getNotificationsOptions = {
  options: {
    fetchPolicy: 'cache-and-network',
    pollInterval: ms('1m'),
  },
  props: mapListProps('notifications'),
}

export const getNotifications = graphql(NotificationsQuery, getNotificationsOptions)
