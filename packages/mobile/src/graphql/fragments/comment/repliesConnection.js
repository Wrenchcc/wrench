import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'

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
            ...userInfo
          }
        }
      }
    }
  }
  ${userInfoFragment}
`
