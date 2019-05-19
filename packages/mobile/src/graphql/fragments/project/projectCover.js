import gql from 'graphql-tag'

export default gql`
  fragment projectCover on Project {
    files: filesConnection(first: 1, type: IMAGE) {
      edges {
        node {
          id
          type
          uri
        }
      }
    }
  }
`
