import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { getRecentPosts } from 'graphql/queries/getExplore'
import { Post, InfiniteListWithHandler } from 'ui'
import Popular from 'features/explore/components/Popular'
import { INITIAL_POSTS_COUNT } from '../constants'

let scrollView = null

class Explore extends PureComponent {
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

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => <Post data={item.node} />

  render() {
    const { posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    // TODO: Remove when have real IDs
    return (
      <InfiniteListWithHandler
        scrollRef={ref => {
          scrollView = ref
        }}
        initialNumToRender={INITIAL_POSTS_COUNT}
        ListHeaderComponent={<Popular />}
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={(item, index) => item.node.id + index}
        renderItem={this.renderItem}
      />
    )
  }
}

export default compose(getRecentPosts)(Explore)
