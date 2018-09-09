import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
// import { track, events } from 'utils/analytics'

const deletePostMutation = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`

const deletePostOptions = {
  props: ({ mutate, ownProps: { post } }) => ({
    deletePost: id => {
      console.log(id, post)

      return mutate({
        variables: {
          id,
        },
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   deletePost: {},
        // },
      })
    },
  }),
}

export const deletePost = graphql(deletePostMutation, deletePostOptions)
