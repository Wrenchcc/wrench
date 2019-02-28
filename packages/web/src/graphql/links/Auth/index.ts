// import { setContext } from 'apollo-link-context'
//
// export default accesToken => setContext((_, { headers }) => ({
//   headers: {
//     ...headers,
//     ...(accesToken && { authorization: `Bearer ${accesToken}` }),
//   },
// }))

import { setContext } from 'apollo-link-context'
import { getTokens } from '../../utils/auth'

export default accesToken => setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${getTokens(null, 'access_token')}`,
  },
}))
