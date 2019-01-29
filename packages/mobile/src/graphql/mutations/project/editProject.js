import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { getProjectId } from 'navigation/utils/selectors'

const EditProjectMutation = gql`
  mutation editProject($id: ID!, $input: ProjectInput!) {
    editProject(id: $id, input: $input) {
      id
      title
      commentsDisabled
    }
  }
`

const editProjectOptions = {
  props: ({ mutate, ownProps: { navigation } }) => ({
    editProject: input => mutate({
      variables: {
        id: getProjectId(navigation),
        input,
      },
    }),
  }),
}

export const editProject = graphql(EditProjectMutation, editProjectOptions)
