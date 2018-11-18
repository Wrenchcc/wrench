import { ApolloServer } from 'apollo-server'
import { createConnection } from 'typeorm'
import { getUserId } from 'api/utils/auth'
import schema from './schema'
import { options, db } from './models'
import services from './services'

const debug = require('debug')('api:server')

const { PORT = 4000, NODE_ENV } = process.env

createConnection(options)
  .then(async () => {
    const server = new ApolloServer({
      context: ({ req }) => ({
        db,
        services,
        userId: getUserId(req),
      }),
      playground: NODE_ENV !== 'production',
      schema,
    })

    server.listen({ port: PORT }).then(({ url }) => {
      debug('🚀 Server ready at %s', url)
    })
  })
  .catch(error => debug(error))
