import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import currentUserInfoFragment from 'graphql/fragments/user/currentUserInfo'
import { getCurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { setAuthenticadedUser, setTokens } from 'graphql/utils/auth'

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
      update: (store, { data }) => {
        const { user, tokens } = data.authenticateUser

        setAuthenticadedUser(user)
        setTokens(tokens)

        store.writeQuery({
          query: getCurrentUserQuery,
          data: {
            currentUser: user,
          },
        })
      },
    }),
  }),
}

export const authenticateUser = graphql(authenticateUserMutation, authenticateUserOptions)
