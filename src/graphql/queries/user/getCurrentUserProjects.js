import gql from 'graphql-tag'
import { pathOr } from 'ramda'
import { graphql } from 'react-apollo'
import projectsConnectionFragment from 'graphql/fragments/user/projectsConnection'

export const getCurrentUserProjectsQuery = gql`
  query getCurrentUserProjects {
    currentUser {
      ...userProjectsConnection
    }
  }
  ${projectsConnectionFragment}
`

const getCurrentUserProjectsOptions = {
  // options: () => ({
  //   fetchPolicy: 'cache-only',
  // }),
  props: ({ data }) => ({
    projects: pathOr(null, ['currentUser', 'projects', 'edges'], data),
  }),
}

export const getCurrentUserProjects = graphql(
  getCurrentUserProjectsQuery,
  getCurrentUserProjectsOptions
)
