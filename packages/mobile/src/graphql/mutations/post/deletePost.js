import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
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
      })
    },
  }),
}

export const deletePost = graphql(DeletePostMutation, deletePostOptions)
