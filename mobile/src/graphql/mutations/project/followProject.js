import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

const followProjectMutation = gql`
  mutation followProject($id: ID!) {
    followProject(id: $id) {
      ...projectInfo
    }
  }
  ${projectInfoFragment}
`

const followProjectOptions = {
  props: ({ mutate }) => ({
    followProject: id => mutate({
      variables: {
        id,
      },
    }),
  }),
}

export const followProject = graphql(followProjectMutation, followProjectOptions)
