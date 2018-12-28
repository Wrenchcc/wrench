import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'

export default gql`
  fragment projectInfo on Project {
    id
    title
    slug
    dynamicLink
    isPrivate
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
