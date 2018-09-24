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

// TODO: OPTIMIZE local state
const addPostOptions = {
  props: ({ mutate }) => ({
    addPost: input => mutate({
      variables: { input },
      updateQueries: {
        getPostProgress: () => ({
          postProgress: {
            image: null,
            title: null,
            __typename: 'PostProgress',
          },
        }),
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
