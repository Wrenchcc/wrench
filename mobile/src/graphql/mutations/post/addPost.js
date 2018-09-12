import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import postInfoFragment from 'graphql/fragments/post/postInfo'

const addPostMutation = gql`
  mutation addPost($input: PostInput!) {
    addPost(input: $input) {
      ...postInfo
    }
  }
  ${postInfoFragment}
`

const addPostOptions = {
  props: ({ mutate }) => ({
    addPost: input => mutate({
      variables: {
        input,
      },
    }),
  }),
}

export const addPost = graphql(addPostMutation, addPostOptions)
