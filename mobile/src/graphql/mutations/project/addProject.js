import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
// import { prepend } from 'ramda'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

const addProjectMutation = gql`
  mutation addProject($input: ProjectInput!) {
    addProject(input: $input) {
      ...projectInfo
    }
  }
  ${projectInfoFragment}
`

const addProjectOptions = {
  props: ({ mutate }) => ({
    addProject: input => mutate({
      variables: { input },
      // updateQueries: {
      //   getCurrentUserProjects: (prev, { mutationResult }) => {
      //     const edge = {
      //       node: mutationResult.data.addProject,
      //       __typename: 'ProjectEdge',
      //     }
      //
      //     return {
      //       ...prev,
      //       user: {
      //         ...prev.user,
      //         projects: {
      //           ...prev.user.projects,
      //           edges: prepend(edge, prev.user.projects.edges),
      //         },
      //       },
      // }
      // },
      // },
    }),
  }),
}

export const addProject = graphql(addProjectMutation, addProjectOptions)
