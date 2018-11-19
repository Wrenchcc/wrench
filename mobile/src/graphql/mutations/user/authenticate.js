import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { setTokens } from 'graphql/utils/auth'

export const authenticateMutation = gql`
  mutation authenticate($facebookToken: String!) {
    authenticate(facebookToken: $facebookToken) {
      accessToken
      refreshToken
    }
  }
`

const authenticateOptions = {
  props: ({ mutate }) => ({
    authenticate: facebookToken => mutate({
      variables: { facebookToken },
      update: (_, { data }) => {
        setTokens(data.authenticate)
        track(events.USER_SIGNED_IN)
      },
    }),
  }),
}

export const authenticate = graphql(authenticateMutation, authenticateOptions)
