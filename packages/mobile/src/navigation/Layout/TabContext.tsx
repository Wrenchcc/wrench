import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export const TabContext = React.createContext({})
export const TabConsumer = TabContext.Consumer

export class TabProvider extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    children: PropTypes.node,
  }

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
