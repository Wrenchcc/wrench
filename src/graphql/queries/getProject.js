import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import getProjectQuery from 'graphql/queries/getProject.graphql'

const getProjectOptions = {
  options: props => ({
    variables: {
      projectId: props.projectId,
    },
  }),
  props: ({ data }) => {
    const { networkStatus, loading, fetchMore, ...props } = data
    return {
      ...props,
      posts: pathOr(null, ['project', 'edges'], data),
      hasNextPage: pathOr(false, ['project', 'pageInfo', 'hasNextPage'], data),
      isRefetching: isRefetching(networkStatus),
      isFetching: loading || isFetchingMore(networkStatus),
      fetchMore: () => fetchMore({
        variables: { after: data.project.edges[data.project.edges.length - 1].cursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const { edges, pageInfo, ...rest } = fetchMoreResult.project

          if (!previousResult.project) {
            return previousResult
          }

          return {
            project: {
              ...rest,
                __typename: previousResult.project.__typename, // eslint-disable-line
              edges: [...previousResult.project.edges, ...edges],
              pageInfo,
            },
          }
        },
      }),
    }
  },
}

export const getProject = graphql(getProjectQuery, getProjectOptions)
