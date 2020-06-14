import { setContext } from '@apollo/link-context'

export default (accessToken) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  }))
