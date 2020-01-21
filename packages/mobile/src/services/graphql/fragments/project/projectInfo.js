import { gql } from '@apollo/client'
import userInfoFragment from 'services/graphql/fragments/user/userInfo'

export default gql`
  fragment projectInfo on Project {
    id
    title
    slug
    dynamicLink
    user {
      ...userInfo
    }
    permissions {
      isOwner
      isFollower
    }
    followers: followersConnection {
      totalCount
    }
  }
  ${userInfoFragment}
`
