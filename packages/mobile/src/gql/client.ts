import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import link from './links'
import { clearTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import { AuthNavigation } from 'navigation'

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache,
  link,
})

client.onClearStore(() => {
  track(events.USER_SIGNED_OUT)
  clearTokens()
  AuthNavigation()
  LoginManager.logOut()
  GoogleSignin.signOut()
})

export default client
