import { graphql } from 'react-apollo'
import { filter } from 'ramda'
import gql from 'graphql-tag'

const deletePostMutation = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`

const deletePostOptions = {
  props: ({ mutate }) => ({
    deletePost: id => mutate({
      variables: {
        id,
      },
      updateQueries: {
        getProjectBySlugQuery: prev => {
          const edges = filter(edge => edge.node.id !== id, prev.project.posts.edges)

          return {
            ...prev,
            project: {
              ...prev.project,
              posts: {
                ...prev.project.posts,
                edges,
              },
            },
          }
        },
      },
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   deletePost: {
      //     id: '123',
      //     ...ownProps.post.project,
      //     __typename: 'Project',
      //   },
      // },
    }),
  }),
}

export const deletePost = graphql(deletePostMutation, deletePostOptions)
