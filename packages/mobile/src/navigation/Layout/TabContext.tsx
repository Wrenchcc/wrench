import React, { PureComponent } from 'react'

export const TabContext = React.createContext({})
export const TabConsumer = TabContext.Consumer

export class TabProvider extends PureComponent {
  get contextProvider() {
    return {
      index: this.props.index,
    }
  }

  render() {
    return (
      <TabContext.Provider value={this.contextProvider}>{this.props.children}</TabContext.Provider>
    )
  }
}

export const withTabContext = Component => props => (
  <TabConsumer>{context => <Component tabContext={context} {...props} />}</TabConsumer>
)
