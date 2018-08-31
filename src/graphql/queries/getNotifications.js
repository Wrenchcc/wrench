import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

export const getNotificationsQuery = gql`
  query getNotifications($after: String) {
    notifications(after: $after) {
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
          }
        }
      }
      pageInfo {
        hasNextPage
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
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('notifications'),
}

export const getNotifications = graphql(getNotificationsQuery, getNotificationsOptions)
