import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'

export default gql`
  fragment commentInfoSmall on CommentConnection {
    totalCount
    edges {
      cursor
      node {
        id
        text
        user {
          ...userInfo
        }
      }
    }
  }
  ${userInfoFragment}
`
