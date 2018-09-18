import { ApolloServer } from 'apollo-server'
import schema from './schema'
import models from './models'
import services from './services'
import { getUserFromRequest } from './utils'

const debug = require('debug')('api:server')

const { PORT } = process.env

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: getUserFromRequest(req),
    services,
    models,
  }),
})

server.listen({ port: PORT }).then(({ url }) => {
  debug('🚀  Server ready at %s', url)
})
