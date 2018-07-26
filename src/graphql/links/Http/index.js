import Config from 'react-native-config'
import { HttpLink } from 'apollo-link-http'

export default new HttpLink({
  uri: Config.GRAPHQL_URI,
})
