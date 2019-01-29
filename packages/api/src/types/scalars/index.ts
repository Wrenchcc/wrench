/**
 * Custom scalars (data types, like Int, String,...) live in this file,
 * both their type definitions and their resolvers
 */
import gql from 'graphql-tag'
import LowercaseString from './LowercaseString'
import Date from './Date'

const typeDefs = gql`
  scalar Date
  scalar LowercaseString
`

const resolvers = {
  Date,
  LowercaseString,
}

export default {
  resolvers,
  typeDefs,
}
