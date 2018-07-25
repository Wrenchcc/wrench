import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// const AUTHENTICATE_FACEBOOK_USER = gql`
//   mutation AuthenticateUserMutation($facebookToken: String!) {
//     authenticateUser(facebookToken: $facebookToken) {
//       token
//     }
//   }
// `

export const ADD_LOGGED_IN_USER = gql`
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

export const addloggedInUser = graphql(ADD_LOGGED_IN_USER, addloggedInUserOptions)
