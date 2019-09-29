import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { setTokens } from 'utils/storage/auth'

export const AuthenticateAppleMutation = gql`
  mutation authenticateApple($identityToken: String!, $user: ApplePayload!) {
    authenticateApple(identityToken: $identityToken, user: $user) {
      access_token
      refresh_token
    }
  }
`

const authenticateAppleOptions = {
  props: ({ mutate }) => ({
    authenticateApple: (identityToken, user) =>
      mutate({
        variables: {
          identityToken,
          user,
        },
        update: async (_, { data }) => {
          const { access_token, refresh_token } = data.authenticateApple
          await setTokens(access_token, refresh_token)
          track(events.USER_SIGNED_IN)
        },
      }),
  }),
}

export const authenticateApple = graphql(AuthenticateAppleMutation, authenticateAppleOptions)
