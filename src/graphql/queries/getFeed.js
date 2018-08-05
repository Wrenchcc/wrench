import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import getFeedQuery from 'graphql/queries/getFeed.graphql'

const getFeedOptions = {
  options: props => ({
    variables: {
      userId: props.userId,
    },
  }),
  props: ({ data }) => {
    const { networkStatus, loading, fetchMore, ...props } = data
    return {
      ...props,
      posts: pathOr(null, ['feed', 'edges'], data),
      hasNextPage: pathOr(false, ['feed', 'pageInfo', 'hasNextPage'], data),
      isRefetching: isRefetching(networkStatus),
      isFetching: loading || isFetchingMore(networkStatus),
      fetchMore: () => fetchMore({
        variables: { after: data.feed.edges[data.feed.edges.length - 1].cursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const { edges, pageInfo, ...rest } = fetchMoreResult.feed

          if (!previousResult.feed) {
            return previousResult
          }

          return {
            feed: {
              ...rest,
                __typename: previousResult.feed.__typename, // eslint-disable-line
              edges: [...previousResult.feed.edges, ...edges],
              pageInfo,
            },
          }
        },
      }),
    }
  },
}

export const getFeed = graphql(getFeedQuery, getFeedOptions)
