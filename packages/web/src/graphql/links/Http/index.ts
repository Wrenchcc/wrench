import { BatchHttpLink } from 'apollo-link-batch-http'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export default new BatchHttpLink({
  uri: publicRuntimeConfig.API_ENDPOINT,
})
