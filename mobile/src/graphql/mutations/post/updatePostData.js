import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const updatePostDataMutation = gql`
  mutation updatePostData($data: PostData) {
    updatePostData(data: $data) @client
  }
`

const updatePostDataOptions = {
  props: ({ mutate }) => ({
    updatePostData: data => mutate({
      variables: { data },
    }),
  }),
}

export const updatePostData = graphql(updatePostDataMutation, updatePostDataOptions)
