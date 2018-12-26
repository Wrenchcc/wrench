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

// TODO: Optimistic update on delete
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
          getProjectBySlugQuery: deletePostFromCache({ type: 'project', id }),
          getFeed: prev => {
            const edges = filter(edge => edge.node.id !== id, prev.posts.edges)

            return {
              ...prev,
              posts: {
                ...prev.posts,
                edges,
              },
            }
          },
        },
      })
    },
  }),
}

export const deletePost = graphql(DeletePostMutation, deletePostOptions)
