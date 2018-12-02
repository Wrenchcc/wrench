import gql from 'graphql-tag'

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
          files: filesConnection(first: 1, type: image) {
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
