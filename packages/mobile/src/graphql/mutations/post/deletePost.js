import { graphql } from 'react-apollo'
import { filter } from 'ramda'
import gql from 'graphql-tag'
import deletePostFromCache from 'graphql/utils/deletePostFromCache'
import { track, events } from 'utils/analytics'

const DeletePostMutation = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`

const deletePostOptions = {
  props: ({ mutate }) => ({
    deletePost: id => {
      track(events.POST_DELETED)

      return mutate({
        variables: {
          id,
        },
        updateQueries: {
          getCurrentUserProfile: deletePostFromCache({ type: 'user', id }),
          getProjectBySlug: deletePostFromCache({ type: 'project', id }),
          getRecentPosts: prev => {
            const edges = filter(edge => edge.node.id !== id, prev.posts.edges)

            return {
              ...prev,
              posts: {
                ...prev.posts,
                edges,
              },
            }
          },
          getFeed: prev => {
            const edges = filter(edge => edge.node.id !== id, prev.feed.posts.edges)

            return {
              ...prev,
              feed: {
                ...prev.feed,
                posts: {
                  ...prev.feed.posts,
                  edges,
                },
              },
            }
          },
        },
      })
    },
  }),
}

export const deletePost = graphql(DeletePostMutation, deletePostOptions)
