import React from 'react'
import PropTypes from 'prop-types'
import Registry from './Registry'

export default class Consumer extends React.Component {
  static propTypes = {
    into: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  static contextTypes = {
    registry: PropTypes.instanceOf(Registry).isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.registry = context.registry
  }

  componentWillMount() {
    this.id = this.registry.register(this.props.into, this.props.children)
    this.renderIntoGatewayNode(this.props)
  }

  componentWillReceiveProps(props) {
    this.registry.clearChild(this.props.into, this.id)
    this.renderIntoGatewayNode(props)
  }

  componentWillUnmount() {
    this.registry.unregister(this.props.into, this.id)
  }

  renderIntoGatewayNode(props) {
    this.registry.addChild(this.props.into, this.id, props.children)
  }

  render() {
    return null
  }
}
