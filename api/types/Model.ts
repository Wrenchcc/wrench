import gql from 'graphql-tag'

export default gql`
  type Model {
    id: ID!
    name: String
    model: String
    year: Int
  }
`
