import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getProjectId } from 'navigation/utils/selectors'
import { mapListProps } from 'graphql/utils/mapListProps'

const getProjectQuery = gql`
  query getProject($id: ID, $first: Int, $after: String, $last: Int, $before: String) {
    project(id: $id, first: $first, after: $after, last: $last, before: $before) {
      id
      title
      followersConnection {
        totalCount
      }
      owner {
        fullName
      }
      permissions {
        isOwner
        isFollowing
      }
      postsConnection(first: 10) {
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
            }
            commentConnection {
              totalCount
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`

const getProjectOptions = {
  options: ({ navigation }) => ({
    variables: {
      id: getProjectId(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('project'),
}

export const getProject = graphql(getProjectQuery, getProjectOptions)
