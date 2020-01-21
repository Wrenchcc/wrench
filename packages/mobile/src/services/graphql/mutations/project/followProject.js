import { graphql } from '@apollo/react-hoc'
import { gql } from '@apollo/client'
import projectInfoFragment from 'services/graphql/fragments/project/projectInfo'
import { track, events } from 'utils/analytics'

const ProjectMutation = gql`
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
      const totalCount = project.permissions.isFollower
        ? project.followers.totalCount - 1
        : project.followers.totalCount + 1

      const isFollower = !project.permissions.isFollower

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
            permissions: {
              ...project.permissions,
              isFollower,
            },
            __typename: 'Project',
          },
        },
      })
    },
  }),
}

export const followProject = graphql(ProjectMutation, followProjectOptions)
