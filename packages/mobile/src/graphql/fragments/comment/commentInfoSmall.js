import gql from 'graphql-tag'
import userInfoFragment from 'graphql-old/fragments/user/userInfo'

export default gql`
  fragment commentInfoSmall on CommentConnection {
    totalCount
    edges {
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
