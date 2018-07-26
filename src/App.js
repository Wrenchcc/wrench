import React, { PureComponent } from 'react'
import { Navigation, setNavigationRef } from 'navigation'
import { Gateway, Zoomable } from 'ui'

export default class App extends PureComponent {
  render() {
    return (
      <Gateway.Provider>
        <Zoomable.Provider>
          <Navigation ref={nav => setNavigationRef(nav)} />
          <Gateway.Destination name="global" />
        </Zoomable.Provider>
      </Gateway.Provider>
    )
  }
}
