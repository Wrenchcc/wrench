import React from 'react'

export const ListContext = React.createContext({})

export const withListContext = Component => props => (
  <ListContext.Consumer>
    {context => <Component listContext={context} {...props} />}
  </ListContext.Consumer>
)
