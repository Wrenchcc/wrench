import { ApolloError } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { v4 } from 'uuid'

const debug = require('debug')('api:errorHandler')

export default error => {
  if (error.originalError instanceof ApolloError) {
    return error
  }

  const errorId = v4()

  console.log('errorId: %o', errorId)
  console.log(error)

  return new GraphQLError(`Internal Error: ${errorId}`)
}
