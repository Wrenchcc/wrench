/**
 * Custom scalars (data types, like Int, String,...) live in this file,
 * both their type definitions and their resolvers
 */
import GraphQLDate from 'graphql-date'
import { GraphQLUpload } from 'apollo-upload-server'
import LowercaseString from './LowercaseString'

const typeDefs = `
	scalar Date
  scalar Upload
  scalar LowercaseString
`

const resolvers = {
  Date: GraphQLDate,
  Upload: GraphQLUpload,
  LowercaseString: LowercaseString,
}

export default {
  typeDefs,
  resolvers,
}
