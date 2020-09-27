import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { RedisCache } from 'apollo-server-cache-redis'
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

const debug = require('debug')('api:server')

const { PORT } = process.env

const TIMESTAMPTZ_OID = 1184

const redis = new RedisCache()

async function server() {
  const connection = await createConnection(options)

  const driver = connection.driver as PostgresDriver
  driver.postgres.defaults.parseInputDatesAsUTC = true
  driver.postgres.types.setTypeParser(TIMESTAMPTZ_OID, str => str)

  const server = new ApolloServer({
    ...debugOptions,
    context: ({ req }) => ({
      db,
      loaders: createLoaders(),
      services,
      redis,
      // @ts-ignore
      userAgent: req.headers['user-agent'],
      userId: getUserId(req),
    }),
    formatError,
    schema,
    validationRules: [depthLimit(10)],
    cache: redis,
    cacheControl: {
      defaultMaxAge: 60,
    },
    plugins: [
      // @ts-ignore
      responseCachePlugin({
        shouldReadFromCache: ({ request }) => !request.http.headers.get('authorization'),
        shouldWriteToCache: ({ request }) => !request.http.headers.get('authorization'),
      }),
    ],
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
