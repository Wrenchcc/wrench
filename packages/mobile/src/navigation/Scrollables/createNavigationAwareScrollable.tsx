import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { withListContext } from '../Layout/context'

export default function createNavigationAwareScrollable(Component) {
  class ComponentWithNavigationScrolling extends PureComponent {
    static displayName = `NavigationAwareScrollable(${Component.displayName || Component.name})`

    componentDidMount() {
      this.bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(
        ({ selectedTabIndex, unselectedTabIndex }) => {
          if (selectedTabIndex === unselectedTabIndex && selectedTabIndex === this.props.tabIndex) {
            this.scrollRef.scrollToOffset
              && this.scrollRef.scrollToOffset({ offset: this.props.listContext.initialScroll })
          }
        }
      )
    }

    componentWillUnmount() {
      this.bottomTabEventListener.remove()
    }

    setRef = node => {
      if (node) {
        this.scrollRef = node.getNode()
      }
    }

    get contentInset() {
      return {
        top: isAndroid ? 0 : this.props.listContext.contentInset,
      }
    }

    get contentOffset() {
      return { y: this.props.listContext.initialScroll }
    }

    get contentContainerStyle() {
      const { listContext, contentContainerStyle } = this.props

      return {
        ...contentContainerStyle,
        paddingTop: isAndroid ? listContext.contentInset : 0,
      }
    }

    renderLoader = fullscreen => <Loader fullscreen={fullscreen} />

    onEndReached = () => {
      if (this.props.hasNextPage && this.props.isRefetching !== true && !this.props.isFetching) {
        this.props.fetchMore()
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
        ListEmptyComponent,
        initialNumToRender = 10,
        paddingHorizontal = 20,
        spacingSeparator,
        ...props
      } = this.props

      const { onScroll, onScrollBeginDrag, onScrollEndDrag } = this.props.listContext

      const initialFetch = !data && isFetching

      return (
        <Component
          ref={this.setRef}
          scrollEventThrottle={1}
          onScroll={onScroll}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
          contentInset={this.contentInset}
          contentOffset={this.contentOffset}
          style={{ flex: 1 }}
          data={data}
          onRefresh={refetch}
          onEndReached={this.onEndReached}
          refreshing={isRefetching}
          initialNumToRender={initialNumToRender}
          ListFooterComponent={hasNextPage ? this.renderLoader() : null}
          ListEmptyComponent={initialFetch ? this.renderLoader(true) : ListEmptyComponent}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          keyExtractor={({ node }) => node.id}
          contentContainerStyle={{
            flex: initialFetch ? 1 : 0,
            paddingLeft: paddingHorizontal,
            paddingRight: paddingHorizontal,
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

  return withListContext(ComponentWithNavigationScrolling, Component)
}
