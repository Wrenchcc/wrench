import React from 'react'
import { Navigation } from 'react-native-navigation'
import Feed from 'features/feed/containers/Feed'
import Explore from 'features/explore/containers/Explore'
import Notifications from 'features/notifications/containers/Notifications'
import Me from 'features/profile/containers/Me'
import Project from 'features/project/containers/Project'
import { Provider } from 'unstated'
import { ApolloProvider } from 'react-apollo'
import createClient from 'graphql/createClient'
import { NavigationContext } from './context'

export const SCREENS = {
  FEED: 'FEED',
  EXPLORE: 'EXPLORE',
  NOTIFICATIONS: 'NOTIFICATIONS',
  ME: 'ME',
  PROJECT: 'PROJECT',
}

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider>
        <ApolloProvider client={createClient()}>
          <NavigationContext.Provider value={{ componentId: props.componentId }}>
            <Component {...props} />
          </NavigationContext.Provider>
        </ApolloProvider>
      </Provider>
    )

    return <EnhancedComponent />
  }
}

export default function registerScreens() {
  Navigation.registerComponent(SCREENS.FEED, () => WrappedComponent(Feed))
  Navigation.registerComponent(SCREENS.EXPLORE, () => WrappedComponent(Explore))
  Navigation.registerComponent(SCREENS.NOTIFICATIONS, () => WrappedComponent(Notifications))
  Navigation.registerComponent(SCREENS.ME, () => WrappedComponent(Me))
  Navigation.registerComponent(SCREENS.PROJECT, () => WrappedComponent(Project))
}
