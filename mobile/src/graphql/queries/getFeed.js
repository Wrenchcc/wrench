import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getUserId } from 'navigation/utils/selectors'
import { mapListProps } from 'graphql/utils/mapListProps'
import postsInfoFragment from 'graphql/fragments/post/postsInfo'

const THIRTY_SECONDS = 30000

export const getFeedQuery = gql`
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
    pollInterval: THIRTY_SECONDS,
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('posts'),
}

export const getFeed = graphql(getFeedQuery, getFeedOptions)
