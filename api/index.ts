import * as express from 'express'
import { ApolloServer, ForbiddenError } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver'
import * as depthLimit from 'graphql-depth-limit'
import { getUserId } from 'api/utils/tokens'
import formatError from 'api/utils/formatError'
import debugOptions from 'api/utils/debugOptions'
import { types } from 'pg'
import schema from './schema'
import { options, db } from './models'
import createLoaders from './loaders'
import services from './services'

const debug = require('debug')('api:server')

const { PORT = 4000, NODE_ENV } = process.env

const TIMESTAMPTZ_OID = 1184

createConnection(options)
  .then(async connection => {
    const driver = connection.driver as PostgresDriver
    driver.postgres.defaults.parseInputDatesAsUTC = true
    driver.postgres.types.setTypeParser(TIMESTAMPTZ_OID, str => str)

    const server = new ApolloServer({
      ...debugOptions,
      context: ({ req, res }) => ({
        db,
        loaders: createLoaders(),
        services,
        userId: getUserId(req),
        userAgent: req.useragent,
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
