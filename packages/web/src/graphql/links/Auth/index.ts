import { setContext } from 'apollo-link-context'
// import { getTokens } from 'graphql/utils/auth'

export default setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    // authorization: `Bearer ${await getTokens('access_token')}`,
  },
}))
