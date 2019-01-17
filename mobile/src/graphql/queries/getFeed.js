import gql from 'graphql-tag'
import ms from 'ms'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import postsInfoFragment from 'graphql/fragments/post/postsInfo'

export const FeedQuery = gql`
  query getFeed($after: String) {
    feed(after: $after) {
      ...postsInfo
    }
  }
  ${postsInfoFragment}
`

const getFeedOptions = {
  options: () => ({
    pollInterval: ms('3m'),
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('feed'),
}

export const getFeed = graphql(FeedQuery, getFeedOptions)
