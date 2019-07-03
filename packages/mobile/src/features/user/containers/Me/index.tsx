import React from 'react'
import { Layout, FlatList } from 'navigation'
import { getCurrentUserProfile } from 'graphql/queries/user/getCurrentUser'
import Post from 'components/Post'
import { EmptyState, KeyboardAvoidingView } from 'ui'
import SettingsButton from 'features/user/components/SettingsButton'
import Header from 'features/user/components/Header'
import { TYPES } from 'ui/EmptyState/constants'

const renderItem = ({ item }) => <Post post={item.node} />

function Me({ posts, user, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const emptyState = user && user.projectCount > 0 ? TYPES.POST : TYPES.PROJECT
  const hasPosts = posts && posts.length > 0

  return (
    <KeyboardAvoidingView paddingHorizontal={0} keyboardVerticalOffset={0}>
      <Layout headerLeft={<SettingsButton />} search={false}>
        <FlatList
          tabIndex={3}
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
          renderItem={renderItem}
        />
      </Layout>
    </KeyboardAvoidingView>
  )
}

export default getCurrentUserProfile(Me)
