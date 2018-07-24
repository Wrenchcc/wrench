import React, { Component } from 'react'
import { Navigation, setNavigationRef } from 'navigation'
import { Gateway, Zoomable } from 'ui'

console.disableYellowBox = true // TODO: Remove

// TODO: Use Gateway for zoomable
export default class App extends Component {
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
