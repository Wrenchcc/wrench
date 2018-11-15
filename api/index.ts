import { ApolloServer } from 'apollo-server'
import { createConnection, ConnectionOptions } from 'typeorm'
import { getUserFromRequest } from 'api/utils/auth'
import schema from './schema'
import models from './models'
import services from './services'
import User from './entity/User'

const debug = require('debug')('api:server')

const { PORT = 4000, NODE_ENV } = process.env

const options: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'wrench',
  synchronize: true,
  entities: [User],
}

createConnection(options)
  .then(async db => {
    const server = new ApolloServer({
      context: ({ req }) => ({
        models,
        services,
        db,
        user: getUserFromRequest(req),
      }),
      playground: NODE_ENV !== 'production',
      schema,
    })

    server.listen({ port: PORT }).then(({ url }) => {
      debug('🚀 Server ready at %s', url)
    })
  })
  .catch(error => debug(error))
