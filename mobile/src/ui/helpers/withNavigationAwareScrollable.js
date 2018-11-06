import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { withNavigation } from '@react-navigation/core'

export default function withNavigationAwareScrollable(Component: any) {
  class ComponentWithNavigationScrolling extends React.PureComponent<any> {
    static displayName = `NavigationAwareScrollable(${Component.displayName || Component.name})`

    componentDidMount() {
      this.subscription = this.props.navigation.addListener('refocus', () => {
        const scrollableNode = this.scrollView
        if (this.props.navigation.isFocused() && scrollableNode !== null) {
          if (scrollableNode.scrollToTop != null) {
            scrollableNode.scrollToTop()
          } else if (scrollableNode.scrollTo != null) {
            scrollableNode.scrollTo({ y: 0 })
          } else {
            scrollableNode.scrollToOffset({ offset: 0 })
          }
        }
      })
    }

    componentWillUnmount() {
      if (this.subscription != null) {
        this.subscription.remove()
      }
    }

    setRef = el => {
      this.scrollView = el

      if (this.props.scrollRef) {
        this.props.scrollRef(el)
      }
    }

    subscription: any

    render() {
      return <Component scrollRef={this.setRef} {...this.props} />
    }
  }

  return hoistStatics(withNavigation(ComponentWithNavigationScrolling), Component)
}
