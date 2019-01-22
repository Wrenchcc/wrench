import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { setTokens } from 'graphql/utils/auth'
import { PLATFORM_TYPES } from 'utils/enums'

export const AuthenticateMutation = gql`
  mutation authenticate($facebookToken: String!, $platform: PlatformType!) {
    authenticate(facebookToken: $facebookToken, platform: $platform) {
      access_token
      refresh_token
    }
  }
`

const authenticateOptions = {
  props: ({ mutate }) => ({
    authenticate: facebookToken => mutate({
      variables: {
        facebookToken,
        platform: PLATFORM_TYPES.MOBILE,
      },
      update: (_, { data }) => {
        setTokens(data.authenticate)
        track(events.USER_SIGNED_IN)
      },
    }),
  }),
}

export const authenticate = graphql(AuthenticateMutation, authenticateOptions)
