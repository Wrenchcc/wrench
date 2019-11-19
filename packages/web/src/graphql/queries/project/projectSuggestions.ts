import gql from 'graphql-tag'

export const GET_PROJECT_SUGGESTIONS = gql`
  query getProjectSuggestions($after: String) {
    projects: projectSuggestions(after: $after, first: 15) @connection(key: "projects") {
      type {
        id
        title
      }
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          title
          slug
          cover {
            uri
          }
          permissions {
            isOwner
            isFollower
          }
          followers: followersConnection {
            totalCount
          }
          user {
            id
            fullName
            username
            isOnline
          }
        }
      }
    }
  }
`
