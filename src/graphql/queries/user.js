import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getCurrentUserQuery = gql`
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

export const getCurrentUser = graphql(getCurrentUserQuery, getCurrentUserOptions)
