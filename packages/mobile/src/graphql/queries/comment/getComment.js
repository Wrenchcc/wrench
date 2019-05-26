import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getCommentIdFromDeeplink } from 'navigation-old/utils/selectors'
import repliesConnectionFragment from 'graphql/fragments/comment/repliesConnection'
import userInfoFragment from 'graphql/fragments/user/userInfo'

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
  options: ({ navigation, id }) => ({
    variables: {
      id: id || getCommentIdFromDeeplink(navigation),
    },
  }),
  props: ({ data: { error, loading, comment } }) => ({
    error,
    comment,
    isFetching: loading,
  }),
}

export const getComment = graphql(CommentQuery, getCommentOptions)
