import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'rambda'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import postInfoFragment from 'graphql/fragments/post/postInfo'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import projectPostsConnectionFragment from 'graphql/fragments/project/postsConnection'

export const GET_PROJECT = gql`
  query getProject($id: ID, $slug: LowercaseString, $after: String, $postId: ID) {
    post(id: $postId) {
      ...postInfo
    }
    project(id: $id, slug: $slug) {
      ...projectInfo
      ...projectPostsConnection
    }
  }
  ${postInfoFragment}
  ${projectInfoFragment}
  ${projectPostsConnectionFragment}
`

const LoadMorePosts = gql`
  query loadMoreProjectPosts($id: ID, $slug: LowercaseString, $after: String) {
    project(id: $id, slug: $slug) {
      ...projectPostsConnection
    }
  }
  ${projectPostsConnectionFragment}
`

const getProjectOptions = {
  options: ({ project, slug, id, postId, after }) => ({
    variables: {
      id,
      slug,
      after,
      postId,
    },
  }),
  props: ({
    ownProps,
    data: { fetchMore, error, loading, project, networkStatus, refetch, post },
  }) => ({
    error,
    refetch,
    post: {
      ...ownProps.post,
      ...post,
    },
    project: {
      ...ownProps.project,
      ...project,
    },
    posts: pathOr(null, ['posts', 'edges'], project),
    hasNextPage: pathOr(false, ['posts', 'pageInfo', 'hasNextPage'], project),
    isRefetching: isRefetching(networkStatus),
    isFetching: (!ownProps.post && loading) || isFetchingMore(networkStatus),
    fetchMore: () =>
      fetchMore({
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

export const getProject = graphql(GET_PROJECT, getProjectOptions)
