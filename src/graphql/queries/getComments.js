import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getPostId } from 'navigation/utils/selectors'
import { mapListProps } from 'graphql/utils/mapListProps'

export const getCommentsQuery = gql`
  query getComments($postId: ID!, $first: Int, $after: String, $last: Int, $before: String) {
    comments(postId: $postId, first: $first, after: $after, last: $last, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          text
          createdAt
          user {
            fullName
            username
            avatarUrl
          }
          repliesConnection(first: 10) {
            pageInfo {
              hasNextPage
            }
            edges {
              node {
                id
                text
                createdAt
                user {
                  fullName
                  username
                  avatarUrl
                }
              }
            }
          }
        }
      }
    }
  }
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

export const getComments = graphql(getCommentsQuery, getCommentsOptions)
