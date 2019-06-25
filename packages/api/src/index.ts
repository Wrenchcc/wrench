import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { getConnectionManager, Connection } from 'typeorm'
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver'
import * as depthLimit from 'graphql-depth-limit'
import { getUserId } from './utils/tokens'
import formatError from './utils/formatError'
import debugOptions from './utils/debugOptions'
import schema from './schema'
import { options, db } from './models'
import createLoaders from './loaders'
import services from './services'

const debug = require('debug')('api:server')

const { PORT = 4000 } = process.env

const TIMESTAMPTZ_OID = 1184

const manager = getConnectionManager()
let connection: Connection

async function init() {
  if (manager.has('default')) {
    connection = await manager.get('default')
    console.log('Reusing existing connection from manager.')
  } else {
    console.log('Creating new connection to DB.')
    connection = await manager.create(options)
  }

  if (!connection.isConnected) {
    console.log('Cached connection was not connected, attempting to reconnect.')
    await connection.connect()
  }

  const driver = connection.driver as PostgresDriver
  driver.postgres.defaults.parseInputDatesAsUTC = true
  driver.postgres.types.setTypeParser(TIMESTAMPTZ_OID, str => str)

  const server = new ApolloServer({
    ...debugOptions,
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

  server.applyMiddleware({ app })

  app.listen({ port: PORT }, () => {
    debug(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  })
}

init()
