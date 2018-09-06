import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { getFeed } from 'graphql/queries/getFeed'
import { Post, Posting, InfiniteList } from 'ui'
import registerForPushNotifications from 'utils/pushNotifications/registerForPushNotifications'
import Empty from 'features/feed/components/Empty'
import { INITIAL_POSTS_COUNT } from '../constants'

let scrollView = null

class Feed extends Component {
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

  componentDidMount() {
    registerForPushNotifications()
  }

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => <Post data={item.node} />

  render() {
    const { posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    return (
      <Fragment>
        {false && (
          <Posting
            title="BMW R100"
            image="https://scontent-arn2-1.cdninstagram.com/vp/3bbd5a6e41c9d12ae0a22fa4dc019951/5BC2DC37/t51.2885-15/s640x640/sh0.08/e35/c202.0.675.675/30079353_2101041190141113_2099464732514713600_n.jpg"
          />
        )}

        <InfiniteList
          scrollRef={ref => {
            scrollView = ref
          }}
          withKeyboardHandler
          defaultPaddingTop
          initialNumToRender={INITIAL_POSTS_COUNT}
          data={posts}
          ListEmptyComponent={<Empty />}
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
