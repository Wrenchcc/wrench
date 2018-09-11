import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const addPostMutation = gql`
  mutation addPost($id: ID!) {
    addPost(id: $id)
  }
`

const addPostOptions = {
  props: ({ mutate }) => ({
    addPost: data => mutate({
      variables: {
        data,
      },
    }),
  }),
}

export const addPost = graphql(addPostMutation, addPostOptions)
