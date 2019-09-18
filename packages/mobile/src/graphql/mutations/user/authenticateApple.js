import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { setTokens } from 'utils/storage/auth'

export const AuthenticateAppleMutation = gql`
  mutation authenticateApple($idToken: String!, $code: String!) {
    authenticateApple(idToken: $idToken, code: $code) {
      access_token
      refresh_token
    }
  }
`

const authenticateAppleOptions = {
  props: ({ mutate }) => ({
    authenticateApple: (idToken, code) =>
      mutate({
        variables: {
          idToken,
          code,
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
