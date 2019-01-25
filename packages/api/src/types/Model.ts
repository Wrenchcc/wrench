import gql from 'graphql-tag'

export default gql`
  type Brand {
    id: ID!
    name: String
  }

  type Model {
    id: ID!
    brand: Brand
    model: String
    year: Int
  }
`
