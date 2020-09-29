import gql from 'graphql-tag'
import projectInfoSmall from '../../fragments/project/projectInfoSmall'
import postInfo from '../../fragments/post/postInfo'

export const GET_EXPLORE = gql`
  query getExplore($after: String, $first: Int) {
    projects(type: POPULAR, after: $after, first: $first) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...projectInfoSmall
          cover {
            uri
          }
        }
      }
    }
    posts(after: $after) {
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
  }
  ${postInfo}
  ${projectInfoSmall}
`
