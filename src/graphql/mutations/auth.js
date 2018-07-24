import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const addAuthenticatedUserMutation = gql`
  mutation addAuthenticatedUser($data: Auth) {
    addAuthenticatedUser(data: $data) @client
  }
`

const addAuthenticatedUserOptions = {
  props: ({ mutate }) => ({
    addAuthenticatedUser: data => mutate({ variables: { data } }),
  }),
}

export const addAuthenticatedUser = graphql(
  addAuthenticatedUserMutation,
  addAuthenticatedUserOptions
)
