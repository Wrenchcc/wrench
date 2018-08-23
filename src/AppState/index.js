import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SplashScreen from 'react-native-splash-screen'
import createClient from 'graphql/createClient'
import { getTokens } from 'graphql/utils/auth'

const AppState = React.createContext()

export class AppStateProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    apolloClient: createClient(),
    loggedIn: false,
    appLoading: true,
  }

  async componentDidMount() {
    const tokens = await getTokens()

    SplashScreen.hide()

    this.setState({
      loggedIn: !!tokens,
      appLoading: false,
    })
  }

  handleLoginState = loggedIn => {
    if (!loggedIn) {
      this.state.apolloClient.resetStore()
    }

    this.setState({
      loggedIn,
    })
  }

  render() {
    return (
      <AppState.Provider
        value={{
          handleLoginState: this.handleLoginState,
          ...this.state,
        }}
      >
        {this.props.children}
      </AppState.Provider>
    )
  }
}

export const AppStateConsumer = AppState.Consumer
