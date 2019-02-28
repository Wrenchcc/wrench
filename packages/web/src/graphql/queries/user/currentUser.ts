import gql from 'graphql-tag'
import userInfoSmall from '../../fragments/user/userInfoSmall'

export const CURRENT_USER = gql`
  query getCurrentUser {
    user: currentUser {
      ...userInfoSmall
    }
  }
  ${userInfoSmall}
`
