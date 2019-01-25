import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getPostId } from 'navigation/utils/selectors'
import { mapListProps } from 'graphql/utils/mapListProps'
import commentInfoFragment from 'graphql/fragments/comment/commentInfo'

export const CommentsQuery = gql`
  query getComments($postId: ID!, $after: String) {
    comments(postId: $postId, after: $after) @connection(key: "comments") {
      ...commentInfo
    }
  }
  ${commentInfoFragment}
`

const getCommentsOptions = {
  options: ({ navigation, after }) => ({
    variables: {
      after,
      postId: getPostId(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('comments'),
}

export const getComments = graphql(CommentsQuery, getCommentsOptions)
