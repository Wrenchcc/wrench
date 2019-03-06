import gql from 'graphql-tag'

export default gql`
  extend type Mutation {
    sendPromo(number: String!): Boolean
  }
`
