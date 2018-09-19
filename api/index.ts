import { ApolloServer } from 'apollo-server'
import schema from './schema'
import models from './models'
import services from './services'
import { getUserFromRequest } from './utils'

const debug = require('debug')('api:server')

const { PORT = 4000 } = process.env

const server = new ApolloServer({
  context: ({ req }) => ({
    models,
    services,
    user: getUserFromRequest(req),
  }),
  schema,
})

server.listen({ port: PORT }).then(({ url }) => {
  debug('🚀  Server ready at %s', url)
})
