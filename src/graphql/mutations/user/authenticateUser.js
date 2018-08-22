import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

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
        console.log(tokens)
      },
    }),
  }),
}

export const authenticateUser = graphql(authenticateUserMutation, authenticateUserOptions)
