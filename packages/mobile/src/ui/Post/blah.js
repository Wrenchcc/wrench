import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { InteractionManager } from 'react-native'

// NOTE: Make the navigation more snappy, wait untill
// Transistion is done before rendering all the items
// Pass enabled e.g. when index > 2
export default class LazyLoad extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    enabled: PropTypes.bool,
  }

  state = {
    hidden: true,
  }

  componentDidMount() {
    if (this.props.enabled) {
      this.interactionHandle = InteractionManager.runAfterInteractions(() => {
        this.setState({ hidden: false })
      })
    }
  }

  componentWillUnmount() {
    if (this.interactionHandle) this.interactionHandle.cancel()
  }

  render() {
    if (this.props.enabled && this.state.hidden) {
      return null
    }

    return this.props.children
  }
}
