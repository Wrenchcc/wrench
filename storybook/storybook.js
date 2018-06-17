/* eslint-disable global-require */
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { getStorybookUI, configure } from '@storybook/react-native'

configure(() => {
  require('./stories')
}, module)

const StorybookUIRoot = getStorybookUI({ port: 7007 })

// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends Component {
  render() {
    return <StorybookUIRoot />
  }
}

AppRegistry.registerComponent('Wrench', () => StorybookUIHMRRoot)

export default StorybookUIHMRRoot
