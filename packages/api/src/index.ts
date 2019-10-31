import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { createConnection } from 'typeorm'
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver'
import depthLimit from 'graphql-depth-limit'
import { getUserId } from './utils/tokens'
import formatError from './utils/formatError'
import debugOptions from './utils/debugOptions'
import schema from './schema'
import { options, db } from './models'
import createLoaders from './loaders'
import services from './services'
import onHealthCheck from './utils/onHealthCheck'
import { client as RedisClient } from './services/redis'

const debug = require('debug')('api:server')

const { PORT } = process.env

const TIMESTAMPTZ_OID = 1184

async function server() {
  const connection = await createConnection(options)

  const driver = connection.driver as PostgresDriver
  driver.postgres.defaults.parseInputDatesAsUTC = true
  driver.postgres.types.setTypeParser(TIMESTAMPTZ_OID, str => str)

  const server = new ApolloServer({
    ...debugOptions,
    cacheControl: {
      calculateHttpHeaders: false,
      // Cache everything for at least a minute since we only cache public responses
      defaultMaxAge: 60,
    },
    cache: RedisClient(),
    plugins: [
      responseCachePlugin({
        sessionId: ({ context }) => (context.userId ? context.userId : null),
        // Only cache public responses
        shouldReadFromCache: ({ context }) => !context.userId,
        shouldWriteToCache: ({ context }) => !context.userId,
      }),
    ],
    context: ({ req }) => ({
      db,
      loaders: createLoaders(),
      services,
      userAgent: req.headers['user-agent'],
      userId: getUserId(req),
    }),
    formatError,
    schema,
    validationRules: [depthLimit(10)],
  })

  const app = express()

  server.applyMiddleware({
    app,
    onHealthCheck,
  })

  app.listen({ port: PORT }, () => {
    debug(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  })
}

server().catch(err => debug(err))
