import gql from 'graphql-tag'
import commentInfoSmall from 'graphql/fragments/comment/commentInfoSmall'

export default gql`
  fragment commentPostConnection on Post {
    comments: commentsConnection(first: 2) @connection(key: "comments") {
      ...commentInfoSmall
    }
  }
  ${commentInfoSmall}
`
