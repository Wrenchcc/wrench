import React from 'react'
import { Layout, FlatList } from 'navigation'
import { getRecentPosts } from 'graphql/queries/getExplore'
import Post from 'components/Post'
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
        renderItem={({ item }) => <Post post={item.node} />}
      />
    </Layout>
  )
}

export default getRecentPosts(Explore)
