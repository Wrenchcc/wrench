import { BatchHttpLink } from 'apollo-link-batch-http'
import fetch from 'isomorphic-unfetch'

export default new BatchHttpLink({
  uri: process.env.API_ENDPOINT,
  fetch,
})
