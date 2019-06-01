import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import Border from 'ui/Border'
import Loader from 'ui/Loader'

class InfiniteList extends PureComponent {
  static propTypes = {
    borderSeparator: PropTypes.bool,
    contentContainerStyle: PropTypes.object,
    data: PropTypes.array,
    defaultPaddingTop: PropTypes.bool,
    fetchMore: PropTypes.func,
    hasNextPage: PropTypes.bool,
    initialNumToRender: PropTypes.number,
    isFetching: PropTypes.bool,
    isRefetching: PropTypes.bool,
    ListEmptyComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    paddingBottom: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    polling: PropTypes.bool,
    refetch: PropTypes.any,
    renderItem: PropTypes.func,
    scrollRef: PropTypes.func,
    spacingSeparator: PropTypes.bool,
  }

  onEndReached = () => {
    if (this.props.hasNextPage && this.props.isRefetching !== true && !this.props.isFetching) {
      this.props.fetchMore()
    }
  }

  renderLoader = () => <Loader />

  renderFullscreenLoader = top => <Loader top={-top} />

  render() {
    const {
      contentContainerStyle = {},
      paddingHorizontal = 20,
      defaultPaddingTop,
      paddingBottom,
      borderSeparator,
      data,
      isFetching,
      hasNextPage,
      fetchMore,
      refetch,
      isRefetching,
      ListEmptyComponent,
      initialNumToRender = 10,
      spacingSeparator,
      ...props
    } = this.props

    const initialFetch = !data && isFetching
    const paddingTop = contentContainerStyle.paddingTop || (defaultPaddingTop && 20) || 0

    return (
      <FlatList
        style={{ flex: 1 }}
        data={data}
        onRefresh={refetch}
        onEndReached={this.onEndReached}
        refreshing={isRefetching}
        initialNumToRender={initialNumToRender}
        ListFooterComponent={hasNextPage ? this.renderLoader() : null}
        ListEmptyComponent={
          initialFetch ? this.renderFullscreenLoader(paddingTop) : ListEmptyComponent
        }
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
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
        {...props}
      />
    )
  }
}

export default InfiniteList
