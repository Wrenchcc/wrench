import React, { Component } from 'react'
import codePush from 'react-native-code-push'
import { ApolloProvider, Query } from 'react-apollo'
import createClient from 'graphql/createClient'
import SplashScreen from 'react-native-splash-screen'
import { checkFrequency } from 'utils/codePush'
import AppNavigator from 'navigation/AppNavigator'
import { getCurrentUserQuery } from 'graphql/queries/getCurrentUser'

// TODO: Remove
console.disableYellowBox = true

if (__DEV__) {
  // Setting `global.XMLHttpRequest` will enable showing Network requests in React Native Debugger
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest
}

class App extends Component {
  state = {
    client: null,
    appLoading: true,
  }

  async componentDidMount() {
    const client = await createClient()

    this.setState({
      client,
      appLoading: false,
    })
  }

  onCompleted() {
    setTimeout(SplashScreen.hide, 500)
  }

  // TODO: Hide SplashScreen when onCompleted is working without fetchPolicy
  //  https://github.com/apollographql/react-apollo/issues/2177
  render() {
    const { appLoading, client } = this.state

    if (appLoading) return null

    return (
      <ApolloProvider client={client}>
        <Query query={getCurrentUserQuery} onCompleted={this.onCompleted} fetchPolicy="cache-only">
          {({ data }) => <AppNavigator authenticated={!!data.currentUser} />}
        </Query>
      </ApolloProvider>
    )
  }
}

export default codePush({ checkFrequency })(App)
