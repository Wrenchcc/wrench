import gql from 'graphql-tag'
import repliesConnection from 'graphql/fragments/comment/repliesConnection'
import userInfo from 'graphql/fragments/user/userInfoSmall'

export default gql`
  fragment commentInfo on Comment {
    id
    text
    createdAt
    permissions {
      isOwner
    }
    likes {
      isLiked
      totalCount
    }
    user {
      ...userInfoSmall
    }
    ...repliesConnection
  }
  ${userInfo}
  ${repliesConnection}
`
