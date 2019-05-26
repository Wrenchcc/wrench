import React from 'react'
import { Navigation } from 'react-native-navigation'

export default function withNavigationAwareScrollable(Component: any) {
  return class ComponentWithNavigationScrolling extends React.PureComponent<any> {
    static displayName = `NavigationAwareScrollable(${Component.displayName || Component.name})`

    componentDidMount() {
      this.bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(
        ({ selectedTabIndex, unselectedTabIndex }) => {
          const scrollableNode = this.scrollView

          if (selectedTabIndex === unselectedTabIndex && scrollableNode !== null) {
            if (scrollableNode.scrollToTop != null) {
              scrollableNode.scrollToTop()
            } else if (scrollableNode.scrollTo != null) {
              scrollableNode.scrollTo({ y: 0 })
            } else {
              scrollableNode.scrollToOffset({ offset: 0 })
            }
          }
        }
      )
    }

    componentWillUnmount() {
      this.bottomTabEventListener.remove()
    }

    setRef = el => {
      this.scrollView = el

      if (this.props.scrollRef) {
        this.props.scrollRef(el)
      }
    }

    render() {
      return <Component scrollRef={this.setRef} {...this.props} />
    }
  }
}
