import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getProjectId } from 'navigation-old/utils/selectors'
import { mapListProps } from 'graphql/utils/mapListProps'
import followersInfoFragment from 'graphql/fragments/followers/followersInfo'

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
  options: ({ navigation }) => ({
    variables: {
      projectId: getProjectId(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('followers'),
}

export const getFollowers = graphql(FollowersQuery, getFollowersOptions)
