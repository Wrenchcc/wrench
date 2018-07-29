import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Animated, AppState } from 'react-native'
import { Border } from 'ui'
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

  componentDidMount = () => {
    AppState.addEventListener('change', this.handleResume)
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleResume)
  }

  handleResume = state => {
    if (state === 'active') {
      this.props.refetch && this.props.refetch()
    }
  }

  renderLoading = () => this.props.isFetching && null

  render() {
    const {
      contentContainerStyle = {},
      paddingHorizontal = 20,
      defaultPaddingTop,
      paddingBottom,
      onScroll,
      scrollRef,
      borderSeparator,
      isFetching,
      hasMore,
      fetchMore,
      refetch,
      isRefetching,
      ...props
    } = this.props

    return (
      <AnimatedFlatlist
        style={{ flex: 1 }}
        ref={el => el && scrollRef && scrollRef(el.getNode())}
        onEndReached={() => !isFetching && hasMore && fetchMore()}
        onRefresh={refetch}
        refreshing={isRefetching}
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
