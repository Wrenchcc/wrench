import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SplashScreen from 'react-native-splash-screen'
import createClient from 'graphql/createClient'
import { getTokens } from 'graphql/utils/auth'

const { Provider, Consumer } = React.createContext()

export class AppStateProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    client: createClient(),
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
      this.state.client.resetStore()
    }

    this.setState({
      loggedIn,
    })
  }

  render = () => (
    <Provider
      value={{
        handleLoginState: this.handleLoginState,
        ...this.state,
      }}
    >
      {this.props.children}
    </Provider>
  )
}

export const AppStateConsumer = Consumer
