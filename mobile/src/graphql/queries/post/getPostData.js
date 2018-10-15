import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getPostDataQuery = gql`
  query getPostData {
    postData @client {
      image
      title
      __typename: PostData
    }
  }
`

const getPostDataOptions = {
  props: ({ data }) => ({
    postData: data,
  }),
}

export const getPostData = graphql(getPostDataQuery, getPostDataOptions)
