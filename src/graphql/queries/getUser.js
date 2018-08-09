import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getUserId } from 'navigation/utils/selectors'
import { mapListProps } from 'graphql/utils/mapListProps'

export const getUserQuery = gql`
  query getUser($id: ID!, $first: Int, $after: String, $last: Int, $before: String) {
    user(id: $id) {
      firstName
      lastName
      avatarUrl
      postsConnection(first: $first, after: $after, last: $last, before: $before) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
          }
        }
      }
    }
  }
`

const getUserOptions = {
  options: ({ navigation }) => ({
    variables: {
      id: getUserId(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('user'),
}

export const getUser = graphql(getUserQuery, getUserOptions)
