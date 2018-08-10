import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getProjectId } from 'navigation/utils/selectors'
import { mapListProps, mapListPropsWithPagination } from 'graphql/utils/mapListProps'

const getProjectQuery = gql`
  query getProject($id: ID, $first: Int, $after: String, $last: Int, $before: String) {
    project(id: $id) {
      id
      title
      followers: followersConnection {
        totalCount
      }
      owner {
        fullName
      }
      permissions {
        isOwner
        isFollowing
      }
      posts: postsConnection(first: $first, after: $after, last: $last, before: $before) {
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
  props: props => {
    const project = mapListProps('project')(props)
    const posts = mapListPropsWithPagination(['project', 'posts'])(props)
    return { ...project, ...posts }
  },
}

export const getProject = graphql(getProjectQuery, getProjectOptions)
