import { ApolloLink } from '@apollo/client'
import AuthLink from './Auth'
import HttpLink from './Http'
import OfflineLink from './Offline'
import RefreshTokenLink from './RefreshToken'
import RetryLink from './Retry'
import AnalyticsLink from './Analytics'
import VersionLink from './Version'

export default ApolloLink.from([
  RetryLink,
  OfflineLink,
  AuthLink,
  RefreshTokenLink,
  AnalyticsLink,
  VersionLink,
  HttpLink,
])
