import { ApolloServer } from 'apollo-server'
import { getUserFromRequest } from 'api/utils/auth'
import schema from './schema'
import models from './models'
import services from './services'

const debug = require('debug')('api:server')

const { PORT = 4000, NODE_ENV } = process.env

const server = new ApolloServer({
  context: ({ req }) => ({
    models,
    services,
    user: getUserFromRequest(req),
  }),
  playground: NODE_ENV !== 'production',
  schema,
})

server.listen({ port: PORT }).then(({ url }) => {
  debug('🚀 Server ready at %s', url)
})
