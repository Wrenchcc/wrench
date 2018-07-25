import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser: loggedInUser @client {
      token
      refreshToken
    }
  }
`

const getCurrentUserOptions = {
  props: ({ data }) => ({
    data,
  }),
}

export const getCurrentUser = graphql(GET_CURRENT_USER, getCurrentUserOptions)
