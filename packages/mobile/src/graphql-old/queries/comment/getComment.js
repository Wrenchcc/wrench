import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getCommentId, getCommentIdFromDeeplink } from 'navigation-old/utils/selectors'
import repliesConnectionFragment from 'graphql-old/fragments/comment/repliesConnection'
import userInfoFragment from 'graphql-old/fragments/user/userInfo'

export const CommentQuery = gql`
  query getComment($id: ID!) {
    comment(id: $id) {
      id
      text
      createdAt
      user {
        ...userInfo
      }
      ...repliesConnection
    }
  }
  ${repliesConnectionFragment}
  ${userInfoFragment}
`

const getCommentOptions = {
  options: ({ navigation }) => ({
    variables: {
      id: getCommentId(navigation) || getCommentIdFromDeeplink(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data: { error, loading, comment } }) => ({
    error,
    comment,
    isFetching: loading,
  }),
}

export const getComment = graphql(CommentQuery, getCommentOptions)
