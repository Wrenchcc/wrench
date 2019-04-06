import { Container } from 'unstated'
import SplashScreen from 'react-native-splash-screen'
import createClient from 'graphql/createClient'
import { getTokens } from 'graphql/utils/auth'

export default class AppContainer extends Container {
  state = {
    client: createClient(),
    loggedIn: false,
    appLoading: true,
  }

  constructor() {
    super()
    this.loadInitialState()
  }

  loadInitialState = async () => {
    const tokens = await getTokens()
    SplashScreen.hide()

    this.setState({
      loggedIn: !!tokens,
      appLoading: false,
    })
  }

  changeLoginState = loggedIn => {
    if (!loggedIn) {
      this.state.client.resetStore()
    }

    this.setState({ loggedIn })
  }
}
