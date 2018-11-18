import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { setTokens } from 'graphql/utils/auth'

export const authenticateMutation = gql`
  mutation authenticate($facebookToken: String!) {
    authenticate(facebookToken: $facebookToken) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`

const authenticateOptions = {
  props: ({ mutate }) => ({
    authenticate: facebookToken => mutate({
      variables: { facebookToken },
      update: (store, { data }) => {
        const { tokens } = data.authenticate
        setTokens(tokens)
        track(events.USER_SIGNED_IN)
      },
    }),
  }),
}

export const authenticate = graphql(authenticateMutation, authenticateOptions)
