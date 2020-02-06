import { ApolloLink } from 'apollo-link'
import { track } from 'utils/analytics'
import camelToSnake from 'utils/camelToSnake'

export default new ApolloLink((operation, forward) => {
  const operationType = operation.query.definitions[0].operation
  const { operationName, variables } = operation

  if (operationName && operationType === 'mutation') {
    // only track mutations.
    track(camelToSnake(operationName), variables)
  }

  return forward(operation)
})
