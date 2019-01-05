import gql from 'graphql-tag'
import ms from 'ms'
import { graphql } from 'react-apollo'
import { getUserId } from 'navigation/utils/selectors'
import { mapListProps } from 'graphql/utils/mapListProps'
import postsInfoFragment from 'graphql/fragments/post/postsInfo'

export const FeedQuery = gql`
  query getFeed($userId: ID, $after: String) {
    posts(userId: $userId, after: $after) {
      ...postsInfo
    }
  }
  ${postsInfoFragment}
`

const getFeedOptions = {
  options: ({ navigation }) => ({
    variables: {
      userId: getUserId(navigation),
    },
    pollInterval: ms('3m'),
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('posts'),
}

export const getFeed = graphql(FeedQuery, getFeedOptions)
