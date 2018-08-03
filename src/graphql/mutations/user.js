import { graphql } from 'react-apollo'
import addCurrentUserMutation from './addCurrentUser.graphql'
import authenticateUserMutation from './authenticateUser.graphql'

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
