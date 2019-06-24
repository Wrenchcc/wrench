import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { prepend } from 'ramda'
import postInfoFragment from 'graphql/fragments/post/postInfo'

const PostMutation = gql`
  mutation addPost($input: PostInput!) {
    addPost(input: $input) {
      ...postInfo
    }
  }
  ${postInfoFragment}
`

const addPostOptions = {
  props: ({ mutate }) => ({
    addPost: input =>
      mutate({
        variables: { input },
        updateQueries: {
          getFeed: (prev, { mutationResult }) => {
            const edge = {
              cursor: -1,
              node: mutationResult.data.addPost,
              __typename: 'PostEdge',
            }

            return {
              ...prev,
              feed: {
                ...prev.feed,
                posts: {
                  ...prev.feed.posts,
                  edges: prepend(edge, prev.feed.posts.edges),
                },
              },
            }
          },
          getRecentPosts: (prev, { mutationResult }) => {
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
          getCurrentUserProfile: (prev, { mutationResult }) => {
            const edge = {
              cursor: -1,
              node: mutationResult.data.addPost,
              __typename: 'PostEdge',
            }

            return {
              ...prev,
              user: {
                ...prev.user,
                posts: {
                  ...prev.user.posts,
                  edges: prepend(edge, prev.user.posts.edges),
                },
              },
            }
          },
        },
      }),
  }),
}

export const addPost = graphql(PostMutation, addPostOptions)
