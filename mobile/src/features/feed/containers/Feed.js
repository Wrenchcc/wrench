import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { pathOr } from 'ramda'
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
    navigation: PropTypes.object.isRequired,
  }

  componentDidMount() {
    registerForPushNotifications()
  }

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => <Post post={item.node} />

  // TODO: update feed when done
  render() {
    const {
      posts,
      fetchMore,
      refetch,
      isRefetching,
      isFetching,
      hasNextPage,
      navigation,
    } = this.props

    const image = pathOr('', ['state', 'params', 'image'], navigation)
    const title = pathOr('', ['state', 'params', 'title'], navigation)

    return (
      <Fragment>
        <PostProgress image={image} title={title} />

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
        />
      </Fragment>
    )
  }
}

export default compose(getFeed)(Feed)
