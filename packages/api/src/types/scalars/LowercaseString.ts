// @ts-nocheck
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export default new GraphQLScalarType({
  description: 'Returns all strings in lower case',
  name: 'LowercaseString',
  parseValue(value) {
    return value.toLowerCase()
  },
  serialize(value) {
    return value.toLowerCase()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value.toLowerCase()
    }
    return null
  },
})
