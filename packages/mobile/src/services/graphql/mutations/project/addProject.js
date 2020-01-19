import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { prepend } from 'rambda'
import { saveSelectedProjectId } from 'store/post'
import projectInfoFragment from 'services/graphql/fragments/project/projectInfo'
import { logError } from 'utils/sentry'

const ProjectMutation = gql`
  mutation addProject($input: ProjectInput!) {
    addProject(input: $input) {
      ...projectInfo
    }
  }
  ${projectInfoFragment}
`

const addProjectOptions = {
  props: ({ mutate }) => ({
    addProject: input =>
      mutate({
        variables: { input },
        // update: (cache, { data: { addProject } }) => {
        //   try {
        //     const data = cache.readQuery({ query: CurrentUserQuery })

        //     const user = {
        //       ...data,
        //       user: {
        //         ...data.user,
        //         projects: {
        //           ...data.user.projects,
        //           edges: prepend(
        //             {
        //               node: {
        //                 ...addProject,
        //                 files: {
        //                   edges: [],
        //                   __typename: 'FileConnection',
        //                 },
        //                 followers: {
        //                   totalCount: 0,
        //                   __typename: 'FollowersConnection',
        //                 },
        //                 __typename: 'Project',
        //               },
        //               __typename: 'ProjectEdge',
        //             },
        //             data.user.projects.edges
        //           ),
        //         },
        //       },
        //     }

        //     cache.writeQuery({ query: CurrentUserQuery, data: user })
        //     saveSelectedProjectId(addProject.id)
        //   } catch (err) {
        //     logError(err)
        //   }
        // },
      }),
  }),
}

export const addProject = graphql(ProjectMutation, addProjectOptions)
