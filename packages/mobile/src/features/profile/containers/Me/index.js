import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { Layout, FlatList } from 'navigation'
import { getCurrentUserProfile } from 'graphql-old/queries/user/getCurrentUser'
import { Post, EmptyState } from 'ui'
import Header from 'features/profile/components/Header'
import { TYPES } from 'ui/EmptyState/constants'

class Me extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    posts: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  renderItem = ({ item }) => <Post post={item.node} disabled />

  render() {
    const { posts, user, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props
    const emptyState = user && user.projectCount > 0 ? TYPES.POST : TYPES.PROJECT
    const hasPosts = posts && posts.length > 0

    return (
      <Layout search={{}}>
        <FlatList
          spacingSeparator
          contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
          ListHeaderComponent={user && <Header user={user} />}
          ListEmptyComponent={<EmptyState type={emptyState} />}
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

export default compose(getCurrentUserProfile)(Me)
