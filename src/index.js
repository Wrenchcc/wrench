import React, { Component } from 'react'
import codePush from 'react-native-code-push'
import { ApolloProvider } from 'react-apollo'
import createClient from 'graphql/createClient'
import { checkFrequency } from 'utils/codePush'
import App from './App'

class Main extends Component {
  state = {
    client: null,
    loading: true,
  }

  async componentDidMount() {
    const client = await createClient()

    this.setState({
      client,
      loading: false,
    })
  }

  render = () => {
    const { loading, client } = this.state

    if (loading) {
      return null
    }

    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    )
  }
}

export default codePush({ checkFrequency })(Main)
