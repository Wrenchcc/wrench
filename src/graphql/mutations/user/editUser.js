import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { getCurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import { setAuthenticadedUser } from 'graphql/utils/auth'

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
        const currentUser = data.editUser
        setAuthenticadedUser(currentUser)

        store.writeQuery({
          query: getCurrentUserQuery,
          data: {
            currentUser,
          },
        })
      },
    }),
  }),
}

export const editUser = graphql(editUserMutation, editUserOptions)
