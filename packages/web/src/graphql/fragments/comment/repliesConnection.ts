import gql from 'graphql-tag'
import userInfo from 'graphql/fragments/user/userInfoSmall'

export default gql`
  fragment repliesConnection on Comment {
    replies: repliesConnection(first: 2) @connection(key: "replies") {
      pageInfo {
        hasNextPage
      }
      totalCount
      edges {
        cursor
        node {
          id
          commentId
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
        }
      }
    }
  }
  ${userInfo}
`
