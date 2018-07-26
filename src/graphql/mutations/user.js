import { graphql } from 'react-apollo'
import addLoggedInUser from './addLoggedInUser.graphql'

const addloggedInUserOptions = {
  props: ({ mutate }) => ({
    addloggedInUser: data => mutate({ variables: { data } }),
  }),
}

export const addloggedInUser = graphql(addLoggedInUser, addloggedInUserOptions)
