import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'

export default gql`
  fragment repliesConnection on Comment {
    replies: repliesConnection(first: 1) {
      pageInfo {
        hasNextPage
      }
      totalCount
      edges {
        node {
          id
          commentId
          text
          createdAt
          user {
            ...userInfo
          }
        }
      }
    }
  }
  ${userInfoFragment}
`
