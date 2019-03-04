import { setContext } from 'apollo-link-context'
import { getTokens } from '../../utils/auth'

export default accesToken => setContext((_, { headers }) => ({
  headers: {
    ...headers,
    // authorization: `Bearer ${accesToken || getTokens(null, 'access_token')}`,
  },
}))
