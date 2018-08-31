import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import userInfoFragment from 'graphql/fragments/user/userInfo'

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
            slug
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
              ...userInfo
            }
            dynamicLink
            projectPermissions {
              isFollower
              isOwner
            }
          }
        }
      }
    }
  }
  ${userInfoFragment}
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
