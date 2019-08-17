import React from 'react'
import { Page, FlatList } from 'navigation'
import { usePaginatedQuery, USER_QUERY } from 'gql'
import Post from 'components/Post'
import { Share } from 'ui'
import FollowingProjects from 'features/user/components/FollowingProjects'
import Header from 'features/user/components/Header'
import UserProjects from 'features/user/components/UserProjects'

const renderItem = ({ item }) => <Post post={item.node} />

function User(props) {
  const {
    user = props.user, // Pass props
    posts,
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery('posts', ['user', 'posts'])(USER_QUERY, {
    variables: {
      username: props.user.username,
    },
  })

  const hasPosts = posts && posts.length > 0
  const fullScreen = !hasPosts || (isFetching && !posts)

  return (
    <Page
      headerTitle={user.fullName}
      headerRight={user.dynamicLink && <Share title={user.fullName} url={user.dynamicLink} text />}
    >
      <FlatList
        initialNumToRender={1}
        spacingSeparator
        paddingHorizontal={hasPosts ? 20 : 0}
        contentContainerStyle={{ flex: fullScreen ? 1 : 0 }}
        ListHeaderComponent={
          user && (
            <>
              <Header
                fullName={user.fullName}
                avatarUrl={user.avatarUrl}
                spacingHorizontal={!hasPosts}
              />

              <UserProjects projects={user.projects} />
            </>
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

export default User
