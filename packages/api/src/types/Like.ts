import gql from 'graphql-tag'

export default gql`
  type Likes {
    totalCount: Int
    isLiked: Boolean
  }
`
