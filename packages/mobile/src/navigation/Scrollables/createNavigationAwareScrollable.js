import React, { PureComponent } from 'react'
import { RefreshControl, Platform, View } from 'react-native'
import PropTypes from 'prop-types'
import { isAndroid } from 'utils/platform'
import { withListContext } from 'navigation/Layout/ListContext'
import { withTabContext } from 'navigation/Layout/TabContext'
import { Border, Loader } from 'ui'
import { getAnimatedScrollableNode } from './utils'

const VIEW_OFFSET = 145

export default function createNavigationAwareScrollable(Component) {
  class ComponentWithNavigationScrolling extends PureComponent {
    static displayName = `NavigationAwareScrollable(${Component.displayName || Component.name})`

    static propTypes = {
      hideHeader: PropTypes.bool,
      onRefresh: PropTypes.func,
      refreshing: PropTypes.bool,
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

    get refreshControl() {
      const { onRefresh, refreshing } = this.props
      return (
        onRefresh && (
          <RefreshControl
            progressViewOffset={VIEW_OFFSET}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )
      )
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

    renderFullscreenLoader = top => <Loader top={-top} />

    renderLoader = () => <Loader />

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
        paddingHorizontal = 20,
        defaultPaddingTop,
        paddingBottom,
        onScroll,
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
      const paddingTop = contentContainerStyle.paddingTop || (defaultPaddingTop && 20) || 0

      return (
        <Component
          {...this.props}
          scrollEventThrottle={1}
          ref={this.ref}
          contentInset={this.contentInset}
          contentOffset={this.contentOffset}
          refreshControl={this.refreshControl}
          style={{ flex: 1 }}
          data={data}
          onRefresh={refetch}
          onEndReached={this.onEndReached}
          refreshing={isRefetching}
          initialNumToRender={initialNumToRender}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={hasNextPage ? this.renderLoader() : null}
          ListEmptyComponent={
            initialFetch ? this.renderFullscreenLoader(paddingTop) : ListEmptyComponent
          }
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          inverted={inverted}
          contentContainerStyle={{
            flex: initialFetch ? 1 : 0, // Fix for ListEmptyComponent to center loader
            justifyContent: 'center',
            paddingLeft: paddingHorizontal,
            paddingRight: paddingHorizontal,
            paddingTop,
            paddingBottom:
              (paddingBottom && paddingBottom)
              || (!initialFetch && data && data.length > 0 && spacingSeparator && 60)
              || 0,
            ...contentContainerStyle,
          }}
          {...borderSeparator && { ItemSeparatorComponent: () => <Border /> }}
          {...spacingSeparator && {
            ItemSeparatorComponent: () => <View style={{ paddingBottom: 50 }} />,
          }}
          {...onScroll && { onScroll, scrollEventThrottle: 1 }}
          {...props}
        />
      )
    }
  }

  return withTabContext(withListContext(ComponentWithNavigationScrolling, Component))
}
