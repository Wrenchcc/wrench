import { gql } from '@apollo/client'
import postInfoFragment from 'services/graphql/fragments/post/postInfo'

export default gql`
  fragment postsInfo on PostConnection {
    edges {
      cursor
      node {
        ...postInfo
      }
    }
    pageInfo {
      hasNextPage
    }
  }
  ${postInfoFragment}
`
