import React, { Component } from 'react'
import codePush from 'react-native-code-push'
import SplashScreen from 'react-native-splash-screen'
import { Navigation, setNavigationRef } from 'navigation'

import firebase from 'react-native-firebase'

console.disableYellowBox = true // TODO: Remove

class App extends Component {
  componentDidMount() {
    SplashScreen.hide()

    const messaging = firebase.messaging()

    messaging.requestPermission().then(permission => {
      console.log(permission)
      messaging.getToken().then(token => alert(token))
    })
  }

  render = () => <Navigation ref={nav => setNavigationRef(nav)} />
}

export default codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })(App)
