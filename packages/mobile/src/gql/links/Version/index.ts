import { setContext } from '@apollo/client/link/context'

const VERSION = 1

export default setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'Accept-version': VERSION,
  },
}))
