import gql from 'graphql-tag'
import ms from 'ms'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

export const NotificationsUnreadCountQuery = gql`
  query {
    notifications {
      unreadCount
    }
  }
`

export const NotificationsQuery = gql`
  query getNotifications($after: String) {
    notifications(after: $after) {
      unreadCount
      pageInfo {
        hasNextPage
      }
      edges {
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
          comment {
            id
            text
            postId
          }
        }
      }
    }
  }
  ${userInfoFragment}
  ${projectInfoFragment}
`

const getNotificationsOptions = {
  options: ({ after = null }) => ({
    variables: {
      after,
    },
    pollInterval: ms('1m'),
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('notifications'),
}

export const getNotifications = graphql(NotificationsQuery, getNotificationsOptions)
