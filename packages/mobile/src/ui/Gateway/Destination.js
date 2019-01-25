import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Registry from './Registry'

export default class Destination extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }

  static contextTypes = {
    registry: PropTypes.instanceOf(Registry).isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.registry = context.registry
  }

  state = {
    children: null,
  }

  componentWillMount() {
    this.registry.addContainer(this.props.name, this)
  }

  componentWillUnmount() {
    this.registry.removeContainer(this.props.name, this)
  }

  render() {
    const { component, ...attrs } = this.props
    delete attrs.name
    return React.createElement(Fragment, attrs, this.state.children)
  }
}
