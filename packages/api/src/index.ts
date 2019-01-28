import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
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

let connection = null

async function server() {
  if (connection && !connection.isConnected) {
    connection = null
    debug('[postgres] connection discard')
  }

  if (connection === null) {
    connection = await createConnection(options)
    debug('[postgres] connection init')
  } else if (connection.isConnected) {
    debug('[postgres] connection connected, quick return')
    return connection
  }

  const driver = connection.driver as PostgresDriver
  driver.postgres.defaults.parseInputDatesAsUTC = true
  driver.postgres.types.setTypeParser(TIMESTAMPTZ_OID, str => str)

  const server = new ApolloServer({
    ...debugOptions,
    playground: true,
    context: ({ req }) => ({
      db,
      loaders: createLoaders(),
      services,
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

server()
