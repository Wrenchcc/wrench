import React, { PureComponent } from 'react'
import { Platform, View } from 'react-native'
import PropTypes from 'prop-types'
import { isAndroid } from 'utils/platform'
import { withListContext } from 'navigation/Layout/context'
import { withTabContext } from 'navigation/Layout/TabContext'
import { Border, Loader } from 'ui'
import { getAnimatedScrollableNode } from './utils'

export default function createNavigationAwareScrollable(Component) {
  class ComponentWithNavigationScrolling extends PureComponent {
    static displayName = `NavigationAwareScrollable(${Component.displayName || Component.name})`

    static propTypes = {
      onRefresh: PropTypes.func,
      scrollRef: PropTypes.func,
      contentContainerStyle: PropTypes.object,
      tabContext: PropTypes.object,
      listContext: PropTypes.object,
    }

    ref = React.createRef()

    componentDidMount() {
      const {
        listContext: { setListRef },
        tabContext: { index },
        scrollRef,
      } = this.props

      this.attachEvent()

      // Pass node to ListContext
      if (setListRef) {
        setListRef(index || 0, this.node)
      }

      // Pass node to component that is using our Scrollables
      if (scrollRef) {
        scrollRef(this.node)
      }
    }

    get node() {
      return getAnimatedScrollableNode(this.ref.current)
    }

    get contentInset() {
      const {
        listContext: { contentInset },
      } = this.props
      const ios = contentInset
      const android = 0

      return {
        top: isAndroid ? android : ios,
      }
    }

    get contentOffset() {
      const {
        listContext: { initialScroll },
      } = this.props

      return { y: initialScroll }
    }

    get contentContainerStyle() {
      const {
        listContext: { contentInset },
        contentContainerStyle,
      } = this.props

      return {
        ...contentContainerStyle,
        ...Platform.select({
          android: {
            paddingTop: contentInset,
          },
        }),
      }
    }

    renderLoader = top => <Loader top={top} />

    onEndReached = () => {
      if (this.props.hasNextPage && this.props.isRefetching !== true && !this.props.isFetching) {
        this.props.fetchMore()
      }
    }

    attachEvent = () => {
      const {
        tabContext: { index },
        listContext,
      } = this.props

      const mapper = [
        ['onScroll', 'handleScroll'],
        ['onScrollEndDrag', 'handleEndDrag'],
        ['onScrollBeginDrag', 'handleBeginDrag'],
      ]

      for (const [eventName, eventHandler] of mapper) {
        const handlers = listContext[eventHandler] || []
        if (handlers.length && this.node && this.node.getScrollableNode) {
          handlers[index || 0].attachEvent(this.node.getScrollableNode(), eventName)
        }
      }
    }

    render() {
      const {
        contentContainerStyle = {},
        borderSeparator,
        data,
        isFetching,
        hasNextPage,
        fetchMore,
        refetch,
        isRefetching,
        ListHeaderComponent,
        ListEmptyComponent,
        inverted,
        initialNumToRender = 10,
        spacingSeparator,
        ...props
      } = this.props

      const initialFetch = !data && isFetching

      return (
        <Component
          scrollEventThrottle={1}
          ref={this.ref}
          contentInset={this.contentInset}
          contentOffset={this.contentOffset}
          style={{ flex: 1 }}
          data={data}
          onRefresh={refetch}
          onEndReached={this.onEndReached}
          refreshing={isRefetching}
          initialNumToRender={initialNumToRender}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={hasNextPage ? this.renderLoader() : null}
          ListEmptyComponent={
            initialFetch ? this.renderLoader(-this.contentInset.top) : ListEmptyComponent
          }
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          inverted={inverted}
          contentContainerStyle={{
            flex: initialFetch ? 1 : 0,
            justifyContent: 'center',
            ...this.contentContainerStyle,
          }}
          {...borderSeparator && { ItemSeparatorComponent: () => <Border /> }}
          {...spacingSeparator && {
            ItemSeparatorComponent: () => <View style={{ paddingBottom: 50 }} />,
          }}
          {...props}
        />
      )
    }
  }

  return withTabContext(withListContext(ComponentWithNavigationScrolling, Component))
}
