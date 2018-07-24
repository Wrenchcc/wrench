import { withClientState } from 'apollo-link-state'
import defaults from './defaults'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

export default cache => withClientState({
  cache,
  defaults,
  resolvers,
  typeDefs,
})
