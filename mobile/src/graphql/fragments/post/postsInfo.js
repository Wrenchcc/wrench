import gql from 'graphql-tag'
import postInfoFragment from 'graphql/fragments/post/postInfo'

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
