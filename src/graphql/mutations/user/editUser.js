import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { setAuthenticadedUser } from 'graphql/utils/auth'
import { getCurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import userInfoFragment from 'graphql/fragments/user/userInfo'

const editUserMutation = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
      ...userInfo
    }
  }
  ${userInfoFragment}
`

const editUserOptions = {
  props: ({ mutate }) => ({
    editUser: input => mutate({
      variables: {
        input,
      },
      update: (store, { data }) => {
        setAuthenticadedUser({ user: data.editUser })
        store.writeQuery({
          query: getCurrentUserQuery,
          data: {
            currentUser: {
              ...data.editUser,
            },
          },
        })
      },
    }),
  }),
}

export const editUser = graphql(editUserMutation, editUserOptions)
