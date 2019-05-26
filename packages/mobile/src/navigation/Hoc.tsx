import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'unstated'
import { ApolloProvider } from 'react-apollo'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import createClient from 'graphql/createClient'
import { NavigationContext } from './context'
import { navigate, showModal, dismissModal } from './actions'

const client = createClient()

export default Component => {
  function Screen(props) {
    return (
      <Provider>
        <ApolloProvider client={client}>
          <NavigationContext.Provider
            value={{
              navigate: navigate(props.componentId),
              showModal,
              dismissModal,
            }}
          >
            <Component {...props} />
          </NavigationContext.Provider>
        </ApolloProvider>
      </Provider>
    )
  }

  Screen.propTypes = {
    componentId: PropTypes.string.isRequired,
  }

  return gestureHandlerRootHOC(Screen)
}
