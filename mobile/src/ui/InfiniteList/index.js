import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Animated } from 'react-native'
import { Border, Loader, LoadNewer } from 'ui'
import withKeyboardHandler from 'ui/helpers/withKeyboardHandler'

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList)

class InfiniteList extends PureComponent {
  static propTypes = {
    borderSeparator: PropTypes.bool,
    onScroll: PropTypes.object,
    scrollRef: PropTypes.func,
    defaultPaddingTop: PropTypes.bool,
    paddingBottom: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    contentContainerStyle: PropTypes.object,
    data: PropTypes.array,
    refetch: PropTypes.any,
    fetchMore: PropTypes.func,
    isRefetching: PropTypes.bool,
    isFetching: PropTypes.bool,
    hasNextPage: PropTypes.bool,
    inverted: PropTypes.bool,
    renderItem: PropTypes.func,
    ListHeaderComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    ListEmptyComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  }

  scrollToNewData = () => {
    // If new posts added to top
    // Hide when close to top
    if (false) {
      return <LoadNewer onPress={() => this.scrollView.scrollToOffset({ offset: 0 })} />
    }

    return null
  }

  onEndReached = ({ distanceFromEnd }) => {
    if (this.props.hasNextPage && this.props.isRefetching !== true && distanceFromEnd > 0) {
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
      ...props
    } = this.props

    const initialFetch = !data && isFetching
    const paddingTop = contentContainerStyle.paddingTop || (defaultPaddingTop && 50) || 0

    return (
      <Fragment>
        {this.scrollToNewData()}

        <AnimatedFlatlist
          style={{ flex: 1 }}
          ref={this.setRef}
          data={data}
          onRefresh={refetch}
          onEndReached={this.onEndReached}
          refreshing={isRefetching}
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
            paddingTop: (defaultPaddingTop && 50) || 0,
            paddingBottom: (paddingBottom && paddingBottom) || 0,
            ...contentContainerStyle,
          }}
          {...borderSeparator && { ItemSeparatorComponent: () => <Border /> }}
          {...onScroll && { onScroll, scrollEventThrottle: 16 }}
          {...props}
        />
      </Fragment>
    )
  }
}

export const InfiniteListWithHandler = withKeyboardHandler(InfiniteList)
export default InfiniteList
