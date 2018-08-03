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
    authenticateUser: data => mutate({ variables: { data } }),
  }),
}

export const addCurrentUser = graphql(addCurrentUserMutation, addCurrentUserOptions)
export const authenticateUser = graphql(authenticateUserMutation, authenticateUserOptions)
