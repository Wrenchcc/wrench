import { BatchHttpLink } from 'apollo-link-batch-http'

export default new BatchHttpLink({
  uri: process.env.API_ENDPOINT,
})
