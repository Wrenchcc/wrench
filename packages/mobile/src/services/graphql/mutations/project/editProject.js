import { graphql } from '@apollo/react-hoc'
import { gql } from '@apollo/client'

const EditProjectMutation = gql`
  mutation editProject($id: ID!, $input: ProjectInput!) {
    editProject(id: $id, input: $input) {
      id
      title
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
