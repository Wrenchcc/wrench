import { setContext } from 'apollo-link-context'

export default tokens => setContext((_, { headers }) => ({
  headers: {
    ...headers,
    ...(tokens && { authorization: `Bearer ${tokens.access_token}` }),
  },
}))
