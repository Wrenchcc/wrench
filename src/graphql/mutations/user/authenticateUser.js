import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import currentUserInfoFragment from 'graphql/fragments/user/currentUserInfo'
import { getCurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { setAuthenticadedUser } from 'graphql/utils/auth'

export const authenticateUserMutation = gql`
  mutation authenticateUser($facebookToken: String!) {
    authenticateUser(facebookToken: $facebookToken) {
      user {
        ...currentUserInfo
      }
      tokens {
        accessToken
        refreshToken
      }
    }
  }
  ${currentUserInfoFragment}
`

const authenticateUserOptions = {
  props: ({ mutate }) => ({
    authenticateUser: facebookToken => mutate({
      variables: { facebookToken },
      update: (store, { data: { authenticateUser } }) => {
        setAuthenticadedUser(authenticateUser)

        store.writeQuery({
          query: getCurrentUserQuery,
          data: {
            currentUser: {
              ...authenticateUser.user,
            },
          },
        })
      },
    }),
  }),
}

export const authenticateUser = graphql(authenticateUserMutation, authenticateUserOptions)
