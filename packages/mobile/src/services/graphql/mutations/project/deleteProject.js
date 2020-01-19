import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
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
        // update: cache => {
        //   try {
        //     const data = cache.readQuery({ query: CurrentUserQuery })
        //     const edges = data.user.projects.edges.filter(edge => edge.node.id !== id)

        //     const user = {
        //       ...data,
        //       user: {
        //         ...data.user,
        //         projects: {
        //           ...data.user.projects,
        //           edges,
        //         },
        //       },
        //     }

        //     cache.writeQuery({ query: CurrentUserQuery, data: user })
        //     removeSelectedProjectId()
        //   } catch (err) {
        //     logError(err)
        //   }
        // },
      }),
  }),
}

export const deleteProject = graphql(DeleteProjectMutation, deleteProjectOptions)
