import React from 'react'
import { compose } from 'react-apollo'
import { getUserByUsername } from 'graphql/queries/user/getUser'
import { PageLayout, FlatList } from 'navigation'
import { Post, Share } from 'ui'
import FollowingProjects from 'features/profile/components/FollowingProjects'
import Header from 'features/profile/components/Header'

function User({ posts, user = {}, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const hasPosts = posts && posts.length > 0

  return (
    <PageLayout
      title={user.fullName}
      headerRight={user.dynamicLink && <Share title={user.fullName} url={user.dynamicLink} text />}
    >
      <FlatList
        initialNumToRender={1}
        spacingSeparator
        paddingHorizontal={hasPosts ? 20 : 0}
        contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
        ListHeaderComponent={user && <Header user={user} spacingHorizontal={!hasPosts} />}
        ListEmptyComponent={user && <FollowingProjects user={user} />}
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={false && isFetching}
        hasNextPage={false && hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={({ item }) => <Post post={item.node} />}
      />
    </PageLayout>
  )
}

export default compose(getUserByUsername)(User)
