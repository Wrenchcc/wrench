import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'unstated'
import { ApolloProvider } from 'react-apollo' // TODO: Remove
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import client from 'graphql/client'
import { NavigationContext } from './context'
import { navigate, showModal, dismissModal } from './actions'

export default Component => {
  function Screen(props) {
    return (
      <Provider>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <NavigationContext.Provider
              value={{
                navigate: navigate(props.componentId),
                showModal,
                dismissModal,
              }}
            >
              <Component {...props} />
            </NavigationContext.Provider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Provider>
    )
  }

  Screen.propTypes = {
    componentId: PropTypes.string.isRequired,
  }

  return gestureHandlerRootHOC(Screen)
}
