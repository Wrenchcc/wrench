/* eslint-disable global-require */
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { getStorybookUI, configure } from '@storybook/react-native'

configure(() => {
  require('./stories')
}, module)

const StorybookUIRoot = getStorybookUI({ port: 7007, host: 'localhost' })

// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return <StorybookUIRoot />
  }
}

AppRegistry.registerComponent('Wrench', () => StorybookUIHMRRoot)

export default StorybookUIHMRRoot
