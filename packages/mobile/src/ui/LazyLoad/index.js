import { PureComponent } from 'react'
import { InteractionManager } from 'react-native'

export default class LazyLoad extends PureComponent {
  state = {
    hidden: true,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ hidden: false })
    })
  }

  render() {
    if (this.state.hidden) {
      return null
    }

    return this.props.children
  }
}
