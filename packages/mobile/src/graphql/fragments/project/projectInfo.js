import gql from 'graphql-tag'
import userInfoFragment from 'graphql-old/fragments/user/userInfo'

export default gql`
  fragment projectInfo on Project {
    id
    title
    slug
    dynamicLink
    commentsDisabled
    user {
      ...userInfo
    }
    projectPermissions {
      isOwner
      isFollower
    }
    followers: followersConnection {
      totalCount
    }
  }
  ${userInfoFragment}
`
