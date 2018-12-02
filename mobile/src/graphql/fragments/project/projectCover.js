import gql from 'graphql-tag'

export default gql`
  fragment projectCover on Project {
    files: filesConnection(first: 6, maxWidth: 335, maxHeight: 335, type: image) {
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
