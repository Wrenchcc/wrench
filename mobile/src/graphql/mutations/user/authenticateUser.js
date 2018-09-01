import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { setTokens } from 'graphql/utils/auth'

export const authenticateUserMutation = gql`
  mutation authenticateUser($facebookToken: String!) {
    authenticateUser(facebookToken: $facebookToken) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`

const authenticateUserOptions = {
  props: ({ mutate }) => ({
    authenticateUser: facebookToken => mutate({
      variables: { facebookToken },
      update: (store, { data }) => {
        const { tokens } = data.authenticateUser
        setTokens(tokens)
        track(events.USER_SIGNED_IN)
      },
    }),
  }),
}

export const authenticateUser = graphql(authenticateUserMutation, authenticateUserOptions)
