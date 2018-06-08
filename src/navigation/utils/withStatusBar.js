import React, { Component, Fragment } from 'react'
import { StatusBar } from 'react-native'

export default (WrapperComponent, statusBarOptions = {}) =>
  class extends Component {
    render = () => (
      <Fragment>
        <StatusBar {...statusBarOptions} />
        <WrapperComponent {...this.props} />
      </Fragment>
    )
  }
