import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { filter } from 'ramda'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { removeSelectedProjectId } from 'store/post'
import { logError } from 'utils/sentry'

const DeleteProjectMutation = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`

const deleteProjectOptions = {
  props: ({ mutate }) => ({
    deleteProject: id =>
      mutate({
        variables: {
          id,
        },
        update: cache => {
          try {
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
            removeSelectedProjectId(id)
          } catch (err) {
            logError(err)
          }
        },
      }),
  }),
}

export const deleteProject = graphql(DeleteProjectMutation, deleteProjectOptions)
