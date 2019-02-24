import { BatchHttpLink } from 'apollo-link-batch-http'

export default new BatchHttpLink({
  uri: 'https://api.wrench.cc/graphql',
})
