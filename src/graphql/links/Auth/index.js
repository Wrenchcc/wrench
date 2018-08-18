import { setContext } from 'apollo-link-context'
import { getToken } from 'graphql/utils/auth'

export default setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${await getToken('accessToken')}`,
  },
}))
