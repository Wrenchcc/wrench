import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import currentUserInfoFragment from 'graphql/fragments/user/currentUserInfo'

export const EditUserMutation = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
      ...currentUserInfo
    }
  }
  ${currentUserInfoFragment}
`

const editUserOptions = {
  props: ({ mutate }) => ({
    editUser: input => mutate({
      variables: {
        input,
      },
    }),
  }),
}

export const editUser = graphql(EditUserMutation, editUserOptions)
