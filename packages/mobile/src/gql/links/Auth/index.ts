import { setContext } from '@apollo/link-context'
import { getAccessToken } from 'utils/storage/auth'

export default setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${getAccessToken()}`,
  },
}))
