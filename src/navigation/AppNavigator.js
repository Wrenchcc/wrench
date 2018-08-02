import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { setNavigationRef } from 'navigation'
import createAppNavigator from 'navigation/createAppNavigator'
import { Gateway, Zoomable } from 'ui'

// TODO: Fix Gateway and Zoomable
export default class AppNavigator extends PureComponent {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  }

  render() {
    const Navigation = createAppNavigator(this.props.authenticated)

    return (
      <Gateway.Provider>
        <Zoomable.Provider>
          <Navigation ref={ref => setNavigationRef(ref)} />
          <Gateway.Destination name="global" />
        </Zoomable.Provider>
      </Gateway.Provider>
    )
  }
}
