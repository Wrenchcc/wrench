import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { getUserId } from './utils/tokens'
import { options, db } from './models'
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver'
// import { RedisCache } from 'apollo-server-cache-redis'
// import * as cache from './utils/redis'
import createLoaders from './loaders'
import debugOptions from './utils/debugOptions'
import depthLimit from 'graphql-depth-limit'
import express from 'express'
import formatError from './utils/formatError'
import onHealthCheck from './utils/onHealthCheck'
// import Redis from 'ioredis'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import schema from './schema'
import services from './services'

const debug = require('debug')('api:server')

const { PORT } = process.env

const TIMESTAMPTZ_OID = 1184

// const redis = new Redis({ host: REDIS_HOST })

async function server() {
  const connection = await createConnection(options)

  const driver = connection.driver as PostgresDriver
  driver.postgres.defaults.parseInputDatesAsUTC = true
  driver.postgres.types.setTypeParser(TIMESTAMPTZ_OID, (str) => str)

  const server = new ApolloServer({
    ...debugOptions,
    context: ({ req }) => ({
      db,
      loaders: createLoaders(),
      services,
      // redis: {
      //   get: cache.get(redis),
      //   set: cache.set(redis),
      //   delete: cache.remove(redis),
      // },
      // @ts-ignore
      userAgent: req.headers['user-agent'],
      userId: getUserId(req),
    }),
    formatError,
    schema,
    validationRules: [depthLimit(10)],
    // cache: new RedisCache({
    //   host: REDIS_HOST,
    // }),
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
    cors: {
      origin: '*',
    },
  })

  app.listen({ port: PORT }, () => {
    debug(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  })
}

server().catch((err) => debug(err))
