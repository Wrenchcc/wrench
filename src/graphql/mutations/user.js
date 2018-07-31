import { graphql } from 'react-apollo'
import addCurrentUserMutation from './addCurrentUser.graphql'

const addCurrentUserOptions = {
  props: ({ mutate }) => ({
    addCurrentUser: data => mutate({ variables: { data } }),
  }),
}

export const addCurrentUser = graphql(addCurrentUserMutation, addCurrentUserOptions)
