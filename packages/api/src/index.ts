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

createConnection(options)
  .then(async connection => {
    const driver = connection.driver as PostgresDriver
    driver.postgres.defaults.parseInputDatesAsUTC = true
    driver.postgres.types.setTypeParser(TIMESTAMPTZ_OID, str => str)

    const server = new ApolloServer({
      ...debugOptions,
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
  })
  .catch(error => debug(error))
