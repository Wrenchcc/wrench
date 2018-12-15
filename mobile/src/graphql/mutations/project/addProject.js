import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

const addProjectMutation = gql`
  mutation addProject($input: ProjectInput!) {
    addProject(input: $input) {
      ...projectInfo
    }
  }
  ${projectInfoFragment}
`

// TODO: Update user projects
const addProjectOptions = {
  props: ({ mutate }) => ({
    addProject: input => mutate({
      variables: { input },
    }),
  }),
}

export const addProject = graphql(addProjectMutation, addProjectOptions)
