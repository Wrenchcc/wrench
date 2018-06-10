import React, { Component } from 'react'
import { Clipboard } from 'react-native'
import codePush from 'react-native-code-push'
import firebase from 'react-native-firebase'
import SplashScreen from 'react-native-splash-screen'
import { Navigation, setNavigationRef } from 'navigation'

const checkFrequency = codePush.CheckFrequency.ON_APP_RESUME

console.disableYellowBox = true // TODO: Remove

class App extends Component {
  componentDidMount() {
    SplashScreen.hide()

    const messaging = firebase.messaging()

    messaging.requestPermission().then(() => {
      // TODO: Send away!
      messaging.getToken().then(token => Clipboard.setString(token))
    })
  }

  render = () => <Navigation ref={nav => setNavigationRef(nav)} />
}

export default codePush({ checkFrequency })(App)
