import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Animated } from 'react-native'
import { Border, Loader } from 'ui'
import withKeyboardHandler from 'ui/helpers/withKeyboardHandler'

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList)

class InfiniteList extends Component {
  static propTypes = {
    borderSeparator: PropTypes.bool,
    onScroll: PropTypes.object,
    scrollRef: PropTypes.func.isRequired,
    defaultPaddingTop: PropTypes.bool,
    paddingBottom: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    fullscreen: PropTypes.bool,
    contentContainerStyle: PropTypes.object,
    animated: PropTypes.bool,
    data: PropTypes.array,
    refetch: PropTypes.func,
    fetchMore: PropTypes.func,
    isRefetching: PropTypes.bool,
    isFetching: PropTypes.bool,
    hasMore: PropTypes.bool,
    inverted: PropTypes.bool,
    renderItem: PropTypes.func,
    ListHeaderComponent: PropTypes.node,
  }

  renderLoading = () => <Loader />

  render() {
    const {
      contentContainerStyle = {},
      paddingHorizontal = 20,
      defaultPaddingTop,
      paddingBottom,
      onScroll,
      scrollRef,
      borderSeparator,
      data,
      isFetching,
      hasMore,
      fetchMore,
      refetch,
      isRefetching,
      ListHeaderComponent,
      ...props
    } = this.props

    if (!data && isFetching) {
      return (
        <Fragment>
          {ListHeaderComponent}
          {this.renderLoading()}
        </Fragment>
      )
    }

    return (
      <AnimatedFlatlist
        style={{ flex: 1 }}
        ref={el => el && scrollRef && scrollRef(el.getNode())}
        data={data}
        onEndReached={() => !isFetching && hasMore && fetchMore()}
        onRefresh={refetch}
        refreshing={isRefetching}
        ListHeaderComponent={ListHeaderComponent}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
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
    )
  }
}

export default withKeyboardHandler(InfiniteList)
