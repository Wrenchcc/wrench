import React, { Component } from 'react'
import codePush from 'react-native-code-push'
import { ApolloProvider, Query } from 'react-apollo'
import SplashScreen from 'react-native-splash-screen'
import { checkFrequency } from 'utils/codePush'
import { AuthNavigator, TabNavigator } from 'navigation'
import createClient from 'graphql/createClient'
import { getToken } from 'graphql/utils/auth'
import { getCurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import Onboarding from 'features/signIn/containers/Onboarding'

// TODO: Remove
console.disableYellowBox = true

if (__DEV__) {
  // Setting `global.XMLHttpRequest` will enable showing Network requests in React Native Debugger
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest
}

class App extends Component {
  state = {
    client: createClient(),
    loggedIn: false,
    appLoading: true,
  }

  async componentDidMount() {
    const token = await getToken()

    SplashScreen.hide()

    this.setState({
      loggedIn: !!token,
      appLoading: false,
    })
  }

  handleLoginState = loggedIn => {
    this.setState({ loggedIn })
  }

  // TODO: Change to Provider for authentication
  // check and change state instead of screenprops
  // Pass new tokens to apollo client
  render() {
    const { appLoading, client, loggedIn } = this.state

    if (appLoading) return null

    return (
      <ApolloProvider client={client}>
        <Query query={getCurrentUserQuery} skip={!loggedIn}>
          {({ data: { user }, networkStatus }) => {
            if (networkStatus === 1 || networkStatus === 2) return null
            if (!user) return <AuthNavigator changeLoginState={this.handleLoginState} />
            if (!user.interestedIn) return <Onboarding />
            return <TabNavigator changeLoginState={this.handleLoginState} />
          }}
        </Query>
      </ApolloProvider>
    )
  }
}

export default codePush({ checkFrequency })(App)
