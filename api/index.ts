import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { getUserId } from 'api/utils/tokens'
import schema from './schema'
import { options, db } from './models'
import loaders from './loaders'
import services from './services'

const debug = require('debug')('api:server')

const { PORT = 4000, NODE_ENV } = process.env

createConnection(options)
  .then(async () => {
    const server = new ApolloServer({
      context: ({ req }) => ({
        db,
        loaders,
        services,
        userId: getUserId(req),
      }),
      introspection: true,
      playground: true,
      schema,
      tracing: true,
    })

    const app = express()

    server.applyMiddleware({ app })

    app.listen({ port: PORT }, () => {
      debug(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
  .catch(error => debug(error))
