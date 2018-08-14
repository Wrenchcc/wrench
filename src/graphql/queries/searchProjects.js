import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
// import projectInfoFragment from 'graphql/fragments/project/projectInfo'

export const searchProjectsQuery = gql`
  query searchProjects($query: String!, $type: SearchType!) {
    projects: search(query: $query, type: $type) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ... on Project {
            id
            title
            images: imagesConnection(first: 6, maxWidth: 335, maxHeight: 335) {
              edges {
                node {
                  id
                  uri
                }
              }
            }
            followers: followersConnection {
              totalCount
            }
            user {
              avatarUrl
            }
            projectPermissions {
              isFollower
              isOwner
            }
          }
        }
      }
    }
  }
`

const searchProjectsOptions = {
  options: ({ query = '' }) => ({
    variables: {
      query,
      type: 'PROJECTS',
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('projects'),
}

export const searchProjects = graphql(searchProjectsQuery, searchProjectsOptions)
