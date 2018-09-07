import gql from 'graphql-tag'

export default gql`
  fragment projectCover on Project {
    images: imagesConnection(first: 6, maxWidth: 335, maxHeight: 335) {
      edges {
        node {
          id
          uri
        }
      }
    }
  }
`
