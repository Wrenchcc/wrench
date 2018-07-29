import { graphql } from 'react-apollo'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import getPostsQuery from 'graphql/queries/getPosts.graphql'

const getPostsOptions = {
  // options: ownProps => ({
  //   variables: {
  //     ...ownProps,
  //   },
  //   notifyOnNetworkStatusChange: true,
  // }),
  props: ({ data }) => {
    const { networkStatus, loading } = data
    return {
      ...data,
      isRefetching: isRefetching(networkStatus),
      isFetching: loading || isFetchingMore(networkStatus),
    }
  },
}

export const getPosts = graphql(getPostsQuery, getPostsOptions)
