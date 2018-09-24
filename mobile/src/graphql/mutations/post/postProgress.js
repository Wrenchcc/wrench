import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const updatePostProgressMutation = gql`
  mutation updatePostProgress($data: PostProgress) {
    updatePostProgress(data: $data) @client
  }
`

const updatePostProgressOptions = {
  props: ({ mutate }) => ({
    updatePostProgress: data => mutate({
      variables: { data },
    }),
  }),
}

export const updatePostProgress = graphql(updatePostProgressMutation, updatePostProgressOptions)
