import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { BottomTabBar } from 'react-navigation-tabs' // eslint-disable-line
import { isAndroid } from 'utils/platform'

// Workaround to keep the TabBar fixed to the bottom on Android
// https://github.com/react-navigation/react-navigation-tabs/issues/16
export default class TabBarComponent extends Component {
  static keyboardEventListeners = []

  state = {
    isVisible: true,
  }

  componentWillMount() {
    if (isAndroid) {
      this.keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', this.visible(false)),
        Keyboard.addListener('keyboardDidHide', this.visible(true)),
      ]
    }
  }

  componentWillUnmount() {
    this.keyboardEventListeners.forEach(eventListener => eventListener.remove())
  }

  visible = isVisible => () => this.setState({ isVisible })

  render() {
    return this.state.isVisible ? <BottomTabBar {...this.props} /> : null
  }
}
