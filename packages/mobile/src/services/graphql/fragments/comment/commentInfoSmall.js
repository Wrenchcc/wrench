import { gql } from '@apollo/client'
import userInfoFragment from 'services/graphql/fragments/user/userInfo'

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
