import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getProjectId } from 'navigation/utils/selectors'
import { mapListPropsWithPagination } from 'graphql/utils/mapListProps'

export const getFollowersQuery = gql`
  query getFollowers($projectId: ID!, $first: Int, $after: String, $last: Int, $before: String) {
    followers(projectId: $projectId, first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id
          fullName
          avatarUrl
          projectCount
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

const getFollowersOptions = {
  options: ({ navigation }) => ({
    variables: {
      projectId: getProjectId(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListPropsWithPagination(['followers']),
}

export const getFollowers = graphql(getFollowersQuery, getFollowersOptions)
