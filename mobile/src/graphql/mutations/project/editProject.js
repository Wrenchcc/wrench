import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ProjectBySlugQuery } from 'graphql/queries/project/getProject'
import { getProjectId, getProjectSlug } from 'navigation/utils/selectors'

const EditProjectMutation = gql`
  mutation editProject($id: ID!, $input: ProjectInput!) {
    editProject(id: $id, input: $input) {
      title
      isPrivate
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
      update: (cache, { data: { editProject } }) => {
        const data = cache.readQuery({
          query: ProjectBySlugQuery,
          variables: { slug: getProjectSlug(navigation) },
        })

        const project = {
          ...data,
          project: {
            ...data.project,
            ...editProject,
          },
        }

        cache.writeQuery({ query: ProjectBySlugQuery, data: project })
      },
    }),
  }),
}

export const editProject = graphql(EditProjectMutation, editProjectOptions)
