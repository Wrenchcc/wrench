import { setContext } from 'apollo-link-context'

export default ({ getToken }) => setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${getToken()}`,
  },
}))
