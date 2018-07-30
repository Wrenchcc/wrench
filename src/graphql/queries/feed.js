import { graphql } from 'react-apollo'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import getFeedQuery from 'graphql/queries/getFeed.graphql'

const getFeedOptions = {
  options: props => ({
    variables: {
      userId: props.userId,
      date: props.date,
    },
  }),
  props: ({ data }) => {
    const { networkStatus, loading } = data
    return {
      ...data,
      isRefetching: isRefetching(networkStatus),
      isFetching: loading || isFetchingMore(networkStatus),
    }
  },
}

export const getFeed = graphql(getFeedQuery, getFeedOptions)
