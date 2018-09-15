import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { prepend } from 'ramda'
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
      variables: { input },
      context: {
        hasUpload: true,
      },
      updateQueries: {
        getFeed: (prev, { mutationResult }) => {
          const edge = {
            cursor: -1,
            node: mutationResult.data.addPost,
            __typename: 'PostEdge',
          }

          return {
            ...prev,
            posts: {
              ...prev.posts,
              edges: prepend(edge, prev.posts.edges),
            },
          }
        },
      },
    }),
  }),
}

export const addPost = graphql(addPostMutation, addPostOptions)
