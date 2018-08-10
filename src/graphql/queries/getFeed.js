import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getUserId } from 'navigation/utils/selectors'
import { mapListPropsWithPagination } from 'graphql/utils/mapListProps'

export const getFeedQuery = gql`
  query getFeed($userId: ID, $first: Int, $after: String, $last: Int, $before: String) {
    posts(userId: $userId, first: $first, after: $after, last: $last, before: $before) {
      edges {
        cursor
        node {
          id
          caption
          user {
            id
            fullName
            username
            avatarUrl
          }
          images {
            uri
          }
          project {
            id
            title
            permissions {
              isOwner
              isFollowing
            }
            followersConnection {
              totalCount
            }
          }
          comments: commentConnection(first: 2) {
            totalCount
            edges {
              node {
                id
                text
                user {
                  fullName
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

const getFeedOptions = {
  options: ({ navigation }) => ({
    variables: {
      userId: getUserId(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: props => mapListPropsWithPagination(['posts'])(props),
}

export const getFeed = graphql(getFeedQuery, getFeedOptions)
