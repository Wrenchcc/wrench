import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import postInfoFragment from 'graphql-old/fragments/post/postInfo'

const EditPostMutation = gql`
  mutation editPost($id: ID!, $input: EditPostInput!) {
    editPost(id: $id, input: $input) {
      ...postInfo
    }
  }
  ${postInfoFragment}
`

const editPostOptions = {
  props: ({ mutate }) => ({
    editPost: (post, input) => mutate({
      variables: { id: post.id, input },
      optimisticResponse: {
        editPost: {
          ...post,
          caption: input.caption,
        },
      },
    }),
  }),
}

export const editPost = graphql(EditPostMutation, editPostOptions)
