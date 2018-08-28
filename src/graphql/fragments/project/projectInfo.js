import gql from 'graphql-tag'

export default gql`
  fragment projectInfo on Project {
    id
    title
    slug
    projectPermissions {
      isOwner
      isFollower
    }
    followers: followersConnection {
      totalCount
    }
  }
`
