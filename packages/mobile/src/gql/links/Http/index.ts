import Config from 'react-native-config'
import { HttpLink } from '@apollo/client'

export default new HttpLink({
  uri: Config.GRAPHQL_URL,
})
