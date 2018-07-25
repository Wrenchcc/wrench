import React, { PureComponent } from 'react'
import { Navigation, setNavigationRef } from 'navigation'
import { Gateway, Zoomable } from 'ui'

export default class App extends PureComponent {
  render() {
    return (
      <Gateway.Provider>
        <Zoomable.Provider>
          <Navigation ref={nav => setNavigationRef(nav)} />
        </Zoomable.Provider>
      </Gateway.Provider>
    )
  }
}
