/**
 * Custom scalars (data types, like Int, String,...) live in this file,
 * both their type definitions and their resolvers
 */
import { GraphQLDateTime } from 'graphql-iso-date'
import LowercaseString from './LowercaseString'

const typeDefs = `
	scalar Date
  scalar LowercaseString
`

const resolvers = {
  Date: GraphQLDateTime,
  LowercaseString,
}

export default {
  resolvers,
  typeDefs,
}
