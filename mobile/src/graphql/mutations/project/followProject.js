import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import { track, events } from 'utils/analytics'

const followProjectMutation = gql`
  mutation followProject($id: ID!) {
    followProject(id: $id) {
      ...projectInfo
    }
  }
  ${projectInfoFragment}
`

const followProjectOptions = {
  props: ({ mutate, ownProps: { project } }) => ({
    followProject: id => {
      const totalCount = project.projectPermissions.isFollower
        ? project.followers.totalCount - 1
        : project.followers.totalCount + 1

      const isFollower = !project.projectPermissions.isFollower

      track(isFollower ? events.PROJECT_FOLLOWED : events.PROJECT_UNFOLLOWED)

      return mutate({
        variables: {
          id,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          followProject: {
            id,
            ...project,
            followers: {
              ...project.followers,
              totalCount,
            },
            projectPermissions: {
              ...project.projectPermissions,
              isFollower,
            },
            __typename: 'Project',
          },
        },
      })
    },
  }),
}

export const followProject = graphql(followProjectMutation, followProjectOptions)
