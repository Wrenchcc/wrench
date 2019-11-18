import gql from 'graphql-tag'

export const GET_PROJECT_TYPES = gql`
  query getProjectTypes {
    types: projectTypes {
      id
      title
      imageUrl
    }
  }
`
