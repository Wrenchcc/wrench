import * as express from 'express'
import { ApolloServer, ForbiddenError } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import * as depthLimit from 'graphql-depth-limit'
import costAnalysis from 'graphql-cost-analysis'
import { getUserId } from 'api/utils/tokens'
import formatError from 'api/utils/formatError'
import schema from './schema'
import { options, db } from './models'
import loaders from './loaders'
import services from './services'

const debug = require('debug')('api:server')

const { PORT = 4000, NODE_ENV } = process.env

// @see pa-bru/graphql-cost-analysis#12
class ProtectedApolloServer extends ApolloServer {
  async createGraphQLServerOptions(req, res) {
    const options = await super.createGraphQLServerOptions(req, res)

    return {
      ...options,
      validationRules: [
        ...options.validationRules,
        costAnalysis({
          maximumCost: 10,
          defaultCost: 1,
          variables: req.body.variables,
          createError: (max, actual) => {
            const err = new ForbiddenError(
              `GraphQL query exceeds maximum complexity, please remove some nesting or fields and try again. (max: ${max}, actual: ${actual})`
            )
            return err
          },
        }),
      ],
    }
  }
}

createConnection(options)
  .then(async () => {
    const server = new ProtectedApolloServer({
      context: ({ req, res }) => ({
        db,
        loaders,
        services,
        userId: getUserId(req),
      }),
      cacheControl: false,
      engine: false,
      formatError,
      introspection: NODE_ENV !== 'production',
      playground: NODE_ENV !== 'production',
      schema,
      tracing: false,
      validationRules: [depthLimit(10)],
    })

    const app = express()

    server.applyMiddleware({ app })

    app.listen({ port: PORT }, () => {
      debug(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
  .catch(error => debug(error))
