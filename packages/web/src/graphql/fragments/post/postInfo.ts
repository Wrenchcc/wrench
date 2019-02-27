import gql from 'graphql-tag'
import userInfoSmall from '../user/userInfoSmall'

export default gql`
  fragment postInfo on Post {
    id
    caption
    user {
      ...userInfoSmall
    }
    files: filesConnection(type: IMAGE) {
      edges {
        node {
          type
          id
          uri
        }
      }
    }
    comments: commentsConnection(first: 2) {
      totalCount
      edges {
        node {
          id
          text
          user {
            ...userInfoSmall
          }
        }
      }
    }
  }
  ${userInfoSmall}
`
