import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { filter } from 'ramda'
import { getProjectId } from 'navigation-old/utils/selectors'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'

const DeleteProjectMutation = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`

const deleteProjectOptions = {
  props: ({ mutate, ownProps: { navigation } }) => ({
    deleteProject: () => mutate({
      variables: {
        id: getProjectId(navigation),
      },
      update: cache => {
        const id = getProjectId(navigation)
        const data = cache.readQuery({ query: CurrentUserQuery })
        const edges = filter(edge => edge.node.id !== id, data.user.projects.edges)

        const user = {
          ...data,
          user: {
            ...data.user,
            projects: {
              ...data.user.projects,
              edges,
            },
          },
        }

        cache.writeQuery({ query: CurrentUserQuery, data: user })
      },
    }),
  }),
}

export const deleteProject = graphql(DeleteProjectMutation, deleteProjectOptions)
