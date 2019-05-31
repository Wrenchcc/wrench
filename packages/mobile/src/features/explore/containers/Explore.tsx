import React, { PureComponent } from 'react'
import { Layout, FlatList } from 'navigation'
import { getRecentPosts } from 'graphql/queries/getExplore'
import { Post } from 'ui'
import Popular from 'features/explore/components/Popular'

function Explore({ posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  return (
    <Layout>
      <FlatList
        tabIndex={1}
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

export default getRecentPosts(Explore)
