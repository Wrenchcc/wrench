import { ApolloError } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { v4 } from 'uuid'

const debug = require('debug')('api:error')

export default error => {
  if (error.originalError instanceof ApolloError) {
    return error
  }

  const errorId = v4()

  debug(`${errorId}: %o`, error)

  return new GraphQLError(`Internal Error: ${errorId}`)
}
