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
          images: imagesConnection(first: 1) {
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
