import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import { getCurrentUserQuery } from '../queries/getCurrentUser'
import { setAuthenticadedUser } from '../utils/auth'

export const authenticateUserMutation = gql`
  mutation authenticateUser($facebookToken: String!) {
    authenticateUser(facebookToken: $facebookToken) {
      user {
        ...userInfo
      }
      tokens {
        accessToken
        refreshToken
      }
    }
  }
  ${userInfoFragment}
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
