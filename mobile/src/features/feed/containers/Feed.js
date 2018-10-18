import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { compose } from 'react-apollo'
import { getFeed } from 'graphql/queries/getFeed'
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
  }

  constructor(props) {
    super(props)
    this.scrollY = new Animated.Value(0)

    registerForPushNotifications()
  }

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => <Post post={item.node} />

  render() {
    const { posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props
    return (
      <>
        <PostProgress />

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
      </>
    )
  }
}

export default compose(getFeed)(Feed)
