import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, FlatList, View } from 'react-native'
import { pathOr, equals } from 'ramda'
import Border from 'ui/Border'
import Loader from 'ui/Loader'
import LoadNewer from 'ui/LoadNewer'

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList)

class InfiniteList extends PureComponent {
  state = {
    hasNewData: false,
  }

  static propTypes = {
    borderSeparator: PropTypes.bool,
    contentContainerStyle: PropTypes.object,
    data: PropTypes.array,
    defaultPaddingTop: PropTypes.bool,
    fetchMore: PropTypes.func,
    hasNextPage: PropTypes.bool,
    initialNumToRender: PropTypes.number,
    inverted: PropTypes.bool,
    isFetching: PropTypes.bool,
    isRefetching: PropTypes.bool,
    ListEmptyComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    ListHeaderComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onScroll: PropTypes.object,
    paddingBottom: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    polling: PropTypes.bool,
    refetch: PropTypes.any,
    renderItem: PropTypes.func,
    scrollRef: PropTypes.func,
    spacingSeparator: PropTypes.bool,
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.polling
      && pathOr(false, ['data'], this.props)
      && pathOr(false, ['data'], prevProps)
      && pathOr(false, ['data'], this.props).length > pathOr(false, ['data'], prevProps).length
      && !equals(
        pathOr(false, ['data', 0, 'node', 'id'], this.props),
        pathOr(false, ['data', 0, 'node', 'id'], prevProps)
      )
      && !pathOr(false, ['data', 0, 'node', 'postPermissions', 'isOwner'], this.props)
    ) {
      this.setNewDataState(true)
    }
  }

  setNewDataState = hasNewData => {
    this.setState({ hasNewData })
  }

  scrollToLatest = () => {
    if (this.state.hasNewData) {
      return (
        <LoadNewer
          onPress={() => {
            this.scrollView.scrollToOffset({ offset: 0 })
          }}
          hide={() => this.setNewDataState(false)}
        />
      )
    }

    return null
  }

  onEndReached = () => {
    if (this.props.hasNextPage && this.props.isRefetching !== true && !this.props.isFetching) {
      this.props.fetchMore()
    }
  }

  renderLoader = () => <Loader />

  renderFullscreenLoader = top => <Loader top={-top} />

  setRef = el => {
    const { scrollRef } = this.props

    if (el) {
      const node = el.getNode()

      // Internal use
      this.scrollView = node

      if (scrollRef) scrollRef(node)
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
      <>
        {this.scrollToLatest()}

        <AnimatedFlatlist
          style={{ flex: 1 }}
          ref={this.setRef}
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
      </>
    )
  }
}

export default InfiniteList
