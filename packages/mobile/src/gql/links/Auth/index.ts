import { setContext } from '@apollo/link-context'
import { getAccessToken } from 'utils/storage/auth'

export default setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${await getAccessToken()}`,
  },
}))
