import gql from 'graphql-tag'
import { pathOr } from 'ramda'
import { graphql } from 'react-apollo'
import projectsConnectionFragment from 'graphql/fragments/user/projectsConnection'

export const CurrentUserProjectsQuery = gql`
  query getCurrentUserProjects {
    user: currentUser {
      ...userProjectsConnection
    }
  }
  ${projectsConnectionFragment}
`

const getCurrentUserProjectsOptions = {
  props: ({ data }) => ({
    projects: pathOr(null, ['user', 'projects', 'edges'], data),
  }),
}

export const getCurrentUserProjects = graphql(
  CurrentUserProjectsQuery,
  getCurrentUserProjectsOptions
)
