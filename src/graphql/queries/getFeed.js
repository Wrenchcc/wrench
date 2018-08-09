import { graphql } from 'react-apollo'
import { getUserId } from 'navigation/utils/selectors'

import { mapListProps } from 'graphql/utils/mapListProps'
import getFeedQuery from 'graphql/queries/getFeed.graphql'

const getFeedOptions = {
  options: ({ navigation }) => ({
    variables: {
      userId: getUserId(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('posts'),
}

export const getFeed = graphql(getFeedQuery, getFeedOptions)
