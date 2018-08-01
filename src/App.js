import React, { PureComponent } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { Query } from 'react-apollo'
import { Navigation, setNavigationRef } from 'navigation'
import { Gateway, Zoomable } from 'ui'
import SignIn from 'features/signIn/containers/SignIn'
import getCurrentUserQuery from 'graphql/queries/getCurrentUser.graphql'

// TODO: Cleanup Gateway and Zoomable
// Animation between logged in/out
export default class App extends PureComponent {
  onCompleted() {
    setTimeout(SplashScreen.hide, 500)
  }

  // TODO: fetchPolicy not needed?: https://github.com/apollographql/react-apollo/issues/2177
  render = () => (
    <Query query={getCurrentUserQuery} onCompleted={this.onCompleted} fetchPolicy="cache-only">
      {({ data }) => {
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
