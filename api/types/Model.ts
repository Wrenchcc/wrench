import gql from 'graphql-tag'

export default gql`
  type Brand {
    id: ID!
    name: String
  }

  type Model {
    id: ID!
    brand: Brand
    name: String
    year: Int
  }
`
