import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { setTokens } from 'utils/storage/auth'

export const AuthenticateGoogleMutation = gql`
  mutation authenticateGoogle($idToken: String!) {
    authenticateGoogle(idToken: $idToken) {
      access_token
      refresh_token
    }
  }
`

const authenticateGoogleOptions = {
  props: ({ mutate }) => ({
    authenticateGoogle: idToken =>
      mutate({
        variables: {
          idToken,
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
