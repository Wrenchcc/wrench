import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { setTokens } from 'utils/storage/auth'

export const AuthenticateFacebookMutation = gql`
  mutation authenticateFacebook($token: String!) {
    authenticateFacebook(token: $token) {
      access_token
      refresh_token
    }
  }
`

const authenticateFacebookOptions = {
  props: ({ mutate }) => ({
    authenticateFacebook: token =>
      mutate({
        variables: {
          token,
        },
        update: (_, { data }) => {
          const { access_token, refresh_token } = data.authenticateFacebook
          setTokens(access_token, refresh_token)
          track(events.USER_SIGNED_IN)
        },
      }),
  }),
}

export const authenticateFacebook = graphql(
  AuthenticateFacebookMutation,
  authenticateFacebookOptions
)
