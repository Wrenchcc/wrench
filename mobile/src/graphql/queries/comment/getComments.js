import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getPostId } from 'navigation/utils/selectors'
import { mapListProps } from 'graphql/utils/mapListProps'
import userInfoFragment from 'graphql/fragments/user/userInfo'

export const CommentsQuery = gql`
  query getComments($postId: ID!, $after: String) {
    comments(postId: $postId, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          text
          createdAt
          user {
            ...userInfo
          }
          replies: repliesConnection {
            edges {
              node {
                id
                text
                createdAt
                user {
                  ...userInfo
                }
              }
            }
          }
        }
      }
    }
  }
  ${userInfoFragment}
`

const getCommentsOptions = {
  options: ({ navigation }) => ({
    variables: {
      postId: getPostId(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('comments'),
}

export const getComments = graphql(CommentsQuery, getCommentsOptions)
