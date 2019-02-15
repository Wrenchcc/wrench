import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { logError } from 'utils/analytics'

export default class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  }

  // state = {
  //   hasError: false,
  // }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error) {
    logError(error)
  }

  render() {
    // if (this.state.hasError) {
    // }

    return this.props.children
  }
}
