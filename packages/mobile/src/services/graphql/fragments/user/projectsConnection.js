import { gql } from '@apollo/client'

export default gql`
  fragment userProjectsConnection on User {
    projects: projectsConnection {
      edges {
        node {
          id
          title
          followers: followersConnection {
            totalCount
          }
          files: filesConnection(first: 1, type: IMAGE) {
            edges {
              node {
                uri
              }
            }
          }
        }
      }
    }
  }
`
