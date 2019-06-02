import React, { PureComponent } from 'react'
import { FlatList, View } from 'react-native'
import Border from 'ui/Border'
import Loader from 'ui/Loader'

class InfiniteList extends PureComponent {
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
