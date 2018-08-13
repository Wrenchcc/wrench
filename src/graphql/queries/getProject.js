import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import { getProjectId } from 'navigation/utils/selectors'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import projectPostsConnectionFragment from 'graphql/fragments/project/postsConnection'

const getProjectQuery = gql`
  query getProject($id: ID!, $after: String) {
    project(id: $id) {
      ...projectInfo
      ...projectPostsConnection
    }
  }
  ${projectInfoFragment}
  ${projectPostsConnectionFragment}
`

const LoadMorePosts = gql`
  query loadMoreProjectPosts($id: ID!, $after: String) {
    project(id: $id) {
      ...projectPostsConnection
    }
  }
  ${projectPostsConnectionFragment}
`

const getProjectOptions = {
  options: ({ navigation, after = null }) => ({
    variables: {
      id: getProjectId(navigation),
      after,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({
    data: { fetchMore, error, loading, project, networkStatus, refetch },
    ownProps: { navigation },
  }) => ({
    error,
    refetch,
    project: pathOr(null, ['state', 'params', 'project'], navigation), // Pass project data from navigation,
    posts: pathOr(null, ['posts', 'edges'], project),
    hasNextPage: pathOr(false, ['posts', 'pageInfo', 'hasNextPage'], project),
    isRefetching: isRefetching(networkStatus),
    isFetching: loading || isFetchingMore(networkStatus),
    fetchMore: () => fetchMore({
      query: LoadMorePosts,
      variables: {
        after: project.posts.edges[project.posts.edges.length - 1].cursor,
        id: project.id,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.project) {
          return prev
        }
        return {
          ...prev,
          project: {
            ...prev.project,
            posts: {
              ...prev.project.posts,
              pageInfo: {
                ...prev.project.posts.pageInfo,
                ...fetchMoreResult.project.posts.pageInfo,
              },
              edges: [...prev.project.posts.edges, ...fetchMoreResult.project.posts.edges],
            },
          },
        }
      },
    }),
  }),
}

export const getProject = graphql(getProjectQuery, getProjectOptions)
