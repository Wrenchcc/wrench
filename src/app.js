import React, { Component } from 'react'
import codePush from 'react-native-code-push'
import SplashScreen from 'react-native-splash-screen'
import { Navigation, setNavigationRef } from 'navigation'

console.disableYellowBox = true // TODO: Remove

class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render = () => <Navigation ref={nav => setNavigationRef(nav)} />
}

export default codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })(App)
