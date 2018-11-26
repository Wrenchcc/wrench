export default `
  type Brand {
    id: ID!
    name: String!
  }

  type Model {
    id: ID!
    model: String
    year: Int
    brand: Brand
  }
`
