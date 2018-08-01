import React, { Component, Fragment } from 'react'
import { StatusBar } from 'react-native'
import { isIphone } from 'utils/platform'

export default (WrapperComponent, statusBarOptions = {}) => class extends Component {
    render = () => (
      <Fragment>
        {isIphone && <StatusBar {...statusBarOptions} />}
        <WrapperComponent {...this.props} />
      </Fragment>
    )
}
