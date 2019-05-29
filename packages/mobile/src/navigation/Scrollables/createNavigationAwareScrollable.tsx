import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { isAndroid } from 'utils/platform'
import { withListContext } from 'navigation/Layout/context'
import { Border, Loader } from 'ui'

export default function createNavigationAwareScrollable(Component) {
  class ComponentWithNavigationScrolling extends PureComponent {
    static displayName = `NavigationAwareScrollable(${Component.displayName || Component.name})`

    static propTypes = {
      onRefresh: PropTypes.func,
      contentContainerStyle: PropTypes.object,
      listContext: PropTypes.object,
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

    renderLoader = top => <Loader fullscreen={top} />

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
        listContext,
        ...props
      } = this.props

      const initialFetch = !data && isFetching

      return (
        <Component
          scrollEventThrottle={1}
          onScroll={listContext.onScroll}
          onScrollBeginDrag={listContext.onScrollBeginDrag}
          onScrollEndDrag={listContext.onScrollEndDrag}
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
            justifyContent: 'center',
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
