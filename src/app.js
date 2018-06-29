import React, { Component } from 'react'
import codePush from 'react-native-code-push'
import SplashScreen from 'react-native-splash-screen'
import { Navigation, setNavigationRef } from 'navigation'
import { Zoomable, NetworkConnectivity } from 'ui'

const checkFrequency = codePush.CheckFrequency.ON_APP_RESUME

console.disableYellowBox = true // TODO: Remove

class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Gateway.Provider>
        <Gateway.Destination name="global" />
        <Navigation ref={nav => setNavigationRef(nav)} />
        <NetworkConnectivity />
      </Gateway.Provider>
    )
  }
}

export default codePush({ checkFrequency })(App)
