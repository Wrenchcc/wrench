import { ApolloLink } from '@apollo/client'
import { track } from 'utils/analytics'
import camelToSnake from 'utils/camelToSnake'

const EXCLUDE = ['refresh_token']

export default new ApolloLink((operation, forward) => {
  const operationType = operation.query.definitions[0].operation
  const { operationName } = operation

  if (operationName && operationType === 'mutation' && !EXCLUDE.includes(operationName)) {
    // only track mutations.
    track(camelToSnake(operationName))
  }

  return forward(operation)
})
