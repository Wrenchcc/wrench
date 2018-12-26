import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import { getProjectSlug } from 'navigation/utils/selectors'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import projectPostsConnectionFragment from 'graphql/fragments/project/postsConnection'

const ProjectBySlugQuery = gql`
  query getProjectBySlug($slug: LowercaseString!, $after: String) {
    project(slug: $slug) {
      ...projectInfo
      ...projectPostsConnection
    }
  }
  ${projectInfoFragment}
  ${projectPostsConnectionFragment}
`

const LoadMorePosts = gql`
  query loadMoreProjectPosts($slug: LowercaseString!, $after: String) {
    project(slug: $slug) {
      ...projectPostsConnection
    }
  }
  ${projectPostsConnectionFragment}
`

const getProjectOptions = {
  options: ({ navigation, after = null }) => ({
    variables: {
      slug: getProjectSlug(navigation),
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
    project: {
      ...pathOr(null, ['state', 'params', 'project'], navigation),
      ...project,
    },
    posts: pathOr(null, ['posts', 'edges'], project),
    hasNextPage: pathOr(false, ['posts', 'pageInfo', 'hasNextPage'], project),
    isRefetching: isRefetching(networkStatus),
    isFetching: loading || isFetchingMore(networkStatus),
    fetchMore: () => fetchMore({
      query: LoadMorePosts,
      variables: {
        after: project.posts.edges[project.posts.edges.length - 1].cursor,
        slug: project.slug,
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

export const getProject = graphql(ProjectBySlugQuery, getProjectOptions)
