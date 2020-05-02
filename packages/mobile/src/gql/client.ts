import { ApolloClient, InMemoryCache } from '@apollo/client'
import link from './links'
import { clearTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import { AuthNavigation } from 'navigation'

export let client = null

export default function createClient() {
  const cache = new InMemoryCache()

  client = new ApolloClient({
    cache,
    link,
  })

  client.onClearStore(() => {
    track(events.USER_SIGNED_OUT)
    clearTokens()
    LoginManager.logOut()
    GoogleSignin.signOut()
    AuthNavigation()
  })

  return client
}
