import React from 'react'
import { getUserByUsername } from 'graphql/queries/user/getUser'
import { Page, FlatList } from 'navigation'
import Post from 'components/Post'
import { Share } from 'ui'
import FollowingProjects from 'features/user/components/FollowingProjects'
import Header from 'features/user/components/Header'

const renderItem = ({ item }) => <Post post={item.node} />

function User({ posts, user = {}, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const hasPosts = posts && posts.length > 0
  const fullScreen = hasPosts || (isFetching && !posts.length)

  return (
    <Page
      headerTitle={user.fullName}
      headerRight={user.dynamicLink && <Share title={user.fullName} url={user.dynamicLink} text />}
    >
      <FlatList
        initialNumToRender={1}
        spacingSeparator
        paddingHorizontal={hasPosts ? 20 : 0}
        contentContainerStyle={{ flex: fullScreen ? 0 : 1 }}
        ListHeaderComponent={
          user && (
            <Header
              fullName={user.fullName}
              avatarUrl={user.avatarUrl}
              spacingHorizontal={!hasPosts}
            />
          )
        }
        ListEmptyComponent={user && <FollowingProjects user={user} />}
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default getUserByUsername(User)
