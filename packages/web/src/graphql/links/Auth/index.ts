import { setContext } from 'apollo-link-context'

export default tokens => setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${tokens.access_token}`,
  },
}))
