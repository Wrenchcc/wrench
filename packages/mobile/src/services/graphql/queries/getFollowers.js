import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'services/graphql/utils/mapListProps'
import followersInfoFragment from 'services/graphql/fragments/followers/followersInfo'

export const FollowersQuery = gql`
  query getFollowers($projectId: ID!, $after: String) {
    followers(projectId: $projectId, after: $after)
      @connection(key: "followers", filter: ["projectId"]) {
      ...followersInfo
    }
  }
  ${followersInfoFragment}
`

const getFollowersOptions = {
  options: ({ id }) => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      projectId: id,
    },
  }),
  props: mapListProps('followers'),
}

export const getFollowers = graphql(FollowersQuery, getFollowersOptions)
