import gql from 'graphql-tag'
import { pathOr } from 'ramda'
import { graphql } from 'react-apollo'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import projectCoverFragment from 'graphql/fragments/project/projectCover'

export const FollowingProjectsQuery = gql`
  query getFollowingProjects($username: LowercaseString!, $after: String) {
    user(username: $username) {
      id
      followingProjects(after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            ...projectInfo
            ...projectCover
          }
        }
      }
    }
  }
  ${projectInfoFragment}
  ${projectCoverFragment}
`

const getFollowingProjectsOptions = {
  options: ({ user, after }) => ({
    variables: {
      username: user.username,
      after,
    },
  }),
  props: ({ data }) => ({
    isFetching: data.loading,
    projects: pathOr(null, ['user', 'followingProjects', 'edges'], data),
  }),
}

export const getFollowingProjects = graphql(FollowingProjectsQuery, getFollowingProjectsOptions)
