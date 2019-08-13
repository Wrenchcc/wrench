import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { setTokens } from 'utils/storage/auth'

export const AuthenticateGoogleMutation = gql`
  mutation authenticateGoogle($idToken: String!, $serverAuthCode: String!) {
    authenticateGoogle(idToken: $idToken, serverAuthCode: $serverAuthCode) {
      access_token
      refresh_token
    }
  }
`

const authenticateGoogleOptions = {
  props: ({ mutate }) => ({
    authenticateGoogle: (idToken, serverAuthCode) =>
      mutate({
        variables: {
          idToken,
          serverAuthCode,
        },
        update: async (_, { data }) => {
          const { access_token, refresh_token } = data.authenticateGoogle
          await setTokens(access_token, refresh_token)
          track(events.USER_SIGNED_IN)
        },
      }),
  }),
}

export const authenticateGoogle = graphql(AuthenticateGoogleMutation, authenticateGoogleOptions)
