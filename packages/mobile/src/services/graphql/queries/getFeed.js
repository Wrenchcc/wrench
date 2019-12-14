import gql from 'graphql-tag'
import { pathOr } from 'rambda'
import ms from 'ms'
import { graphql } from 'react-apollo'
import { isRefetching, isFetchingMore } from 'services/graphql/utils/networkStatus'
import feedPostsConnectionFragment from 'services/graphql/fragments/feed/postsConnection'

export const FeedQuery = gql`
  query getFeed($after: String) {
    feed {
      ...feedPostsConnection
    }
  }
  ${feedPostsConnectionFragment}
`

const getFeedOptions = {
  options: {
    fetchPolicy: 'cache-and-network',
    pollInterval: ms('3m'),
  },
  props: ({ data: { fetchMore, error, loading, feed, networkStatus, refetch } }) => ({
    error,
    refetch,
    posts: pathOr(null, ['posts', 'edges'], feed),
    hasNextPage: pathOr(false, ['posts', 'pageInfo', 'hasNextPage'], feed),
    isRefetching: isRefetching(networkStatus),
    isFetching: loading || isFetchingMore(networkStatus),
    fetchMore: () =>
      fetchMore({
        query: FeedQuery,
        variables: {
          after: feed.posts.edges[feed.posts.edges.length - 1].cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult.feed) {
            return prev
          }

          return {
            ...prev,
            feed: {
              ...prev.feed,
              posts: {
                ...prev.feed.posts,
                pageInfo: {
                  ...prev.feed.posts.pageInfo,
                  ...fetchMoreResult.feed.posts.pageInfo,
                },
                edges: [...prev.feed.posts.edges, ...fetchMoreResult.feed.posts.edges],
              },
            },
          }
        },
      }),
  }),
}

export const getFeed = graphql(FeedQuery, getFeedOptions)
