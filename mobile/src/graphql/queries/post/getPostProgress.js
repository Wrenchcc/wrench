import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'

export const getPostProgressQuery = gql`
  query getPostProgress {
    postProgress @client {
      image
      title
      __typename: PostProgress
    }
  }
`

const getPostProgressOptions = {
  options: () => ({
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data }) => ({
    postProgress: {
      image: pathOr(null, ['postProgress', 'image'], data),
      title: pathOr(null, ['postProgress', 'title'], data),
    },
  }),
}

export const getPostProgress = graphql(getPostProgressQuery, getPostProgressOptions)
