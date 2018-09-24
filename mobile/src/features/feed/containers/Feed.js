import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { compose } from 'react-apollo'
import { getFeed } from 'graphql/queries/getFeed'
import { getPostProgress } from 'graphql/queries/post/getPostProgress'
import { Post, InfiniteListWithHandler, PostProgress } from 'ui'
import registerForPushNotifications from 'utils/pushNotifications/registerForPushNotifications'
import ProjectSuggestions from 'features/feed/components/ProjectSuggestions'
import { INITIAL_POSTS_COUNT } from '../constants'

let scrollView = null

class Feed extends PureComponent {
  static navigationOptions = {
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      if (navigation.isFocused()) {
        scrollView.scrollToOffset({ offset: 0 })
      } else {
        defaultHandler()
      }
    },
  }

  static propTypes = {
    posts: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    postProgress: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.scrollY = new Animated.Value(0)

    this.headerY = this.scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: [0, -60],
      extrapolate: 'clamp',
    })

    registerForPushNotifications()
  }

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => <Post post={item.node} />

  render() {
    const {
      posts,
      fetchMore,
      refetch,
      isRefetching,
      isFetching,
      hasNextPage,
      postProgress,
    } = this.props

    return (
      <Fragment>
        <PostProgress
          image={postProgress.image}
          title={postProgress.title}
          translateY={this.headerY}
        />

        <InfiniteListWithHandler
          scrollRef={ref => {
            scrollView = ref
          }}
          defaultPaddingTop
          initialNumToRender={INITIAL_POSTS_COUNT}
          hasPolling
          data={posts}
          ListEmptyComponent={<ProjectSuggestions />}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          keyExtractor={item => item.node.id}
          renderItem={this.renderItem}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
            useNativeDriver: true,
          })}
        />
      </Fragment>
    )
  }
}

export default compose(
  getFeed,
  getPostProgress
)(Feed)
