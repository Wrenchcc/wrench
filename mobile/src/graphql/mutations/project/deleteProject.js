import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { getProjectId } from 'navigation/utils/selectors'

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
    }),
  }),
}

export const deleteProject = graphql(DeleteProjectMutation, deleteProjectOptions)
