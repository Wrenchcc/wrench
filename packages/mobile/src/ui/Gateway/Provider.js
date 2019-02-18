import React from 'react'
import PropTypes from 'prop-types'
import Registry from './Registry'
import Destination from './Destination'

export default class Provider extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }

  static childContextTypes = {
    registry: PropTypes.instanceOf(Registry).isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.registry = new Registry()
  }

  getChildContext() {
    return {
      registry: this.registry,
    }
  }

  render() {
    return (
      <>
        {this.props.children}
        <Destination name="global" />
      </>
    )
  }
}
