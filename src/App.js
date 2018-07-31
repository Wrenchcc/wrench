import React, { PureComponent } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { Query } from 'react-apollo'
import { Navigation, setNavigationRef } from 'navigation'
import { Gateway, Zoomable } from 'ui'
import SignIn from 'features/signIn/containers/SignIn'
import getCurrentUserQuery from 'graphql/queries/getCurrentUser.graphql'

export default class App extends PureComponent {
  onCompleted() {
    setTimeout(SplashScreen.hide, 500)
  }

  render() {
    return (
      <Query query={getCurrentUserQuery} onCompleted={this.onCompleted}>
        {({ data, loading }) => {
          console.log(data)
          if (loading) return null
          if (data.currentUser) {
            return (
              <Gateway.Provider>
                <Zoomable.Provider>
                  <Navigation ref={nav => setNavigationRef(nav)} />
                  <Gateway.Destination name="global" />
                </Zoomable.Provider>
              </Gateway.Provider>
            )
          }

          return <SignIn />
        }}
      </Query>
    )
  }
}
