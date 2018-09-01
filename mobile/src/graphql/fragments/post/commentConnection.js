import gql from 'graphql-tag'
import commentInfoFragment from 'graphql/fragments/comment/commentInfoSmall'

export default gql`
  fragment commentPostConnection on Post {
    comments: commentConnection(first: 2) {
      ...commentInfoSmall
    }
  }
  ${commentInfoFragment}
`
