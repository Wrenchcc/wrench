import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { prepend } from 'ramda'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
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
        update: (cache, { data: { addProject } }) => {
          try {
            const data = cache.readQuery({ query: CurrentUserQuery })

            const user = {
              ...data,
              user: {
                ...data.user,
                projects: {
                  ...data.user.projects,
                  edges: prepend(
                    {
                      node: {
                        id: addProject.id,
                        title: addProject.title,
                        files: {
                          edges: [],
                          __typename: 'FileConnection',
                        },
                        followers: {
                          totalCount: 0,
                          __typename: 'FollowersConnection',
                        },
                        __typename: 'Project',
                      },
                      __typename: 'ProjectEdge',
                    },
                    data.user.projects.edges
                  ),
                },
              },
            }

            cache.writeQuery({ query: CurrentUserQuery, data: user })
          } catch (err) {
            logError(err)
          }
        },
      }),
  }),
}

export const addProject = graphql(ProjectMutation, addProjectOptions)
