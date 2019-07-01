import { ApolloLink } from 'apollo-link'
import AuthLink from './Auth'
import HttpLink from './Http'
import OfflineLink from './Offline'
import RefreshTokenLink from './RefreshToken'
import RetryLink from './Retry'

export default ApolloLink.from([RetryLink, OfflineLink, AuthLink, RefreshTokenLink, HttpLink])
