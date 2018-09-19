import posts from '../../fixtures/posts'

const debug = require('debug')('api:server')

// TODO: Check if user data
export default async (_, { input }, ctx) => {
  debug('%O', input)

  return posts()[0].node
}
