import React from 'react'
import { compose } from 'react-apollo'
import { Layout, FlatList } from 'navigation'
import { getCurrentUserProfile } from 'graphql/queries/user/getCurrentUser'
import { Post, EmptyState } from 'ui'
import SettingsButton from 'features/profile/components/SettingsButton'
import Header from 'features/profile/components/Header'
import { TYPES } from 'ui/EmptyState/constants'

function Me({ posts, user, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const emptyState = user && user.projectCount > 0 ? TYPES.POST : TYPES.PROJECT
  const hasPosts = posts && posts.length > 0

  return (
    <Layout headerLeft={<SettingsButton />} search={false} headerTitle="hej">
      <FlatList
        initialNumToRender={1}
        spacingSeparator
        paddingHorizontal={hasPosts ? 20 : 0}
        contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
        ListHeaderComponent={user && <Header user={user} spacingHorizontal={!hasPosts} />}
        ListEmptyComponent={<EmptyState type={emptyState} />}
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

export default compose(getCurrentUserProfile)(Me)
