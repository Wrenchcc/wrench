import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { getRecentPosts } from 'graphql/queries/getExplore'
import { Post, InfiniteListWithHandler } from 'ui'
import Popular from 'features/explore/components/Popular'
import { INITIAL_POSTS_COUNT } from '../constants'

class Explore extends PureComponent {
  static propTypes = {
    posts: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  renderItem = ({ item }) => <Post post={item.node} />

  render() {
    const { posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    return (
      <InfiniteListWithHandler
        spacingSeparator
        initialNumToRender={INITIAL_POSTS_COUNT}
        ListHeaderComponent={<Popular />}
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

export default compose(getRecentPosts)(Explore)
