import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const addloggedInUserMutation = gql`
  mutation addLoggedInUser($data: Auth) {
    addLoggedInUser(data: $data) @client
  }
`
export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`

const addloggedInUserOptions = {
  props: ({ mutate }) => ({
    addloggedInUser: data => mutate({ variables: { data } }),
  }),
}

export const addloggedInUser = graphql(addloggedInUserMutation, addloggedInUserOptions)
