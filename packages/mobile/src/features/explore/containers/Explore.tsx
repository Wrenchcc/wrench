import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { Layout, FlatList } from 'navigation'
import { getRecentPosts } from 'graphql/queries/getExplore'
import { Post } from 'ui'
import Popular from 'features/explore/components/Popular'

function Explore({ posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  return (
    <Layout>
      <FlatList
        spacingSeparator
        initialNumToRender={2}
        ListHeaderComponent={<Popular />}
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={({ item }) => <Post post={item.node} />}
      />
    </Layout>
  )
}

Explore.propTypes = {
  posts: PropTypes.array,
  fetchMore: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  isRefetching: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
}

export default compose(getRecentPosts)(Explore)
