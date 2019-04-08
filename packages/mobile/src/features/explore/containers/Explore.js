import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { Layout, FlatList } from 'navigation'
import { getRecentPosts } from 'graphql-old/queries/getExplore'
import { Post } from 'ui'
import Popular from 'features/explore/components/Popular'

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
      <Layout search={{}}>
        <FlatList
          spacingSeparator
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
      </Layout>
    )
  }
}

export default compose(getRecentPosts)(Explore)
