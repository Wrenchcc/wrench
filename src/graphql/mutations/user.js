import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const authenticateUserMutation = gql`
  mutation authenticateUser($facebookToken: String!) {
    authenticateUser(facebookToken: $facebookToken) {
      token
      refreshToken
      user {
        id
        fullName
        firstName
        lastName
        username
        avatarUrl
      }
    }
  }
`

export const addCurrentUserMutation = gql`
  mutation addCurrentUser($data: User) {
    addCurrentUser(data: $data) @client
  }
`

const addCurrentUserOptions = {
  props: ({ mutate }) => ({
    addCurrentUser: data => mutate({ variables: { data } }),
  }),
}

const authenticateUserOptions = {
  props: ({ mutate }) => ({
    authenticateUser: facebookToken => mutate({ variables: { facebookToken } }),
  }),
}

export const addCurrentUser = graphql(addCurrentUserMutation, addCurrentUserOptions)
export const authenticateUser = graphql(authenticateUserMutation, authenticateUserOptions)
