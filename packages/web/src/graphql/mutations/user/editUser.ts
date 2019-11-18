import gql from 'graphql-tag'
import currentUserInfo from 'graphql/fragments/user/currentUserInfo'

export const EDIT_USER_MUTATION = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
      ...currentUserInfo
    }
  }
  ${currentUserInfo}
`
