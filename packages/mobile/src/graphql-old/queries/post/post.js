import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import postInfoFragment from 'graphql-old/fragments/post/postInfo'

const PostById = gql`
  query getPostById($id: ID) {
    post(id: $id) {
      ...postInfo
    }
  }
  ${postInfoFragment}
`

const getPostByOptions = {
  options: ({ id }) => ({
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data }) => ({
    post: pathOr(null, ['post'], data),
  }),
}

export const getPostById = graphql(PostById, getPostByOptions)
