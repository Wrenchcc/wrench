import Config from 'react-native-config'
import { BatchHttpLink } from 'apollo-link-batch-http'

export default new BatchHttpLink({
  uri: Config.GRAPHQL_URL,
})
