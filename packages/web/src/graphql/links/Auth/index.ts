import { setContext } from 'apollo-link-context'

export default accesToken => setContext((_, { headers }) => ({
  headers: {
    ...headers,
    ...(accesToken && { authorization: `Bearer ${accesToken}` }),
  },
}))
