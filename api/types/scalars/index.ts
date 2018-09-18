/**
 * Custom scalars (data types, like Int, String,...) live in this file,
 * both their type definitions and their resolvers
 */
import GraphQLDate from 'graphql-date'
import LowercaseString from './LowercaseString'

const typeDefs = `
	scalar Date
  scalar LowercaseString
`

const resolvers = {
  Date: GraphQLDate,
  LowercaseString: LowercaseString,
}

export default {
  typeDefs,
  resolvers,
}
