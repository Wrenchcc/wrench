// @ts-nocheck
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export default new GraphQLScalarType({
  description: 'Date custom scalar type',
  name: 'Date',
  parseValue(value) {
    return new Date(value) // value from the client
  },
  serialize(value) {
    return new Date(value).toISOString() // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value) // ast value is always in string format
    }
    return null
  },
})
