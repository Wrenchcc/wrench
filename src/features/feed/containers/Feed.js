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

  renderItem = ({ item }) => <Post data={item} />

  render() {
    const { feed, fetchMore, refetch, isRefetching, isFetching, hasMore } = this.props

    return (
      <InfiniteList
        scrollRef={ref => {
          scrollView = ref
        }}
        withKeyboardHandler
        defaultPaddingTop
        initialNumToRender={INITIAL_POSTS_COUNT}
        data={feed}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasMore={hasMore}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
      />
    )
  }
}

export default compose(getFeed)(Feed)
