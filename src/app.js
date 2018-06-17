import React, { Component, Fragment } from 'react'
import codePush from 'react-native-code-push'
import SplashScreen from 'react-native-splash-screen'
import { Navigation, setNavigationRef } from 'navigation'
import { NetworkConnectivity } from 'ui'

import { S3Client } from 'utils/storage'

const checkFrequency = codePush.CheckFrequency.ON_APP_RESUME

console.disableYellowBox = true // TODO: Remove

class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Fragment>
        <Navigation ref={nav => setNavigationRef(nav)} />
        <NetworkConnectivity />
      </Fragment>
    )
  }
}

export default codePush({ checkFrequency })(App)
