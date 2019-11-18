import gql from 'graphql-tag'
import currentUserInfo from '../../fragments/user/currentUserInfo'

export const CURRENT_USER = gql`
  query getCurrentUser {
    user: currentUser {
      ...currentUserInfo
    }
  }
  ${currentUserInfo}
`
