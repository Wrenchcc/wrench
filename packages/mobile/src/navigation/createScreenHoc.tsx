import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { isAndroid } from 'utils/platform'
import { NavigationContext } from './context'
// import { SCREENS } from './constants'

export default client => Component => {
  function Screen({ componentId, ...props }) {
    // NOTE: If overlay is open do not update the componentId
    // push etc will stop working next navigate
    // const id =
    //   componentId !== SCREENS.MENTION && componentId !== SCREENS.EDIT_POST ? componentId : null
    // console.log(id)

    return (
      <ApolloProvider client={client}>
        <NavigationContext.Provider value={componentId}>
          <ActionSheetProvider>
            <Component {...{ componentId, ...props }} />
          </ActionSheetProvider>
        </NavigationContext.Provider>
      </ApolloProvider>
    )
  }

  return isAndroid ? gestureHandlerRootHOC(Screen) : Screen
}
