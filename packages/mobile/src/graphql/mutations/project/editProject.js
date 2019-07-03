import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
  props: ({ mutate }) => ({
    editProject: (id, input) =>
      mutate({
        variables: {
          id,
          input,
        },
      }),
  }),
}

export const editProject = graphql(EditProjectMutation, editProjectOptions)
