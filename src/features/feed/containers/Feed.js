import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { getFeed } from 'graphql/queries/feed'
import { Post, InfiniteList } from 'ui'
import registerForPushNotifications from 'utils/pushNotifications/registerForPushNotifications'
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
      <InfiniteList
        scrollRef={ref => {
          scrollView = ref
        }}
        withKeyboardHandler
        defaultPaddingTop
        initialNumToRender={INITIAL_POSTS_COUNT}
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={this.renderItem}
      />
    )
  }
}

export default compose(getFeed)(Feed)
