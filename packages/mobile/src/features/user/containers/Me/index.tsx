import React from 'react'
import { Layout, FlatList } from 'navigation'
import {
  useQuery,
  usePaginatedQuery,
  CURRENT_USER_PROJECTS_QUERY,
  CURRENT_USER_PROFILE_QUERY,
} from 'gql'
import Post from 'components/Post'
import { EmptyState } from 'ui'
import SettingsButton from 'features/user/components/SettingsButton'
import Header from 'features/user/components/Header'
import { TYPES } from 'ui/EmptyState/constants'
import UserProjects from 'features/user/components/UserProjects'

const renderItem = ({ item }) => <Post post={item.node} />

function Me() {
  const {
    user,
    posts,
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery('posts', ['user', 'posts'])(CURRENT_USER_PROFILE_QUERY)

  const hasPosts = posts && posts.length > 0
  const fullScreen = !hasPosts || (isFetching && !posts)

  const { data } = useQuery(CURRENT_USER_PROJECTS_QUERY, {
    fetchPolicy: 'cache-only',
  })

  const emptyState = data.user.projects.edges.length > 0 ? TYPES.POST : TYPES.PROJECT

  return (
    <Layout headerLeft={<SettingsButton />} search={false}>
      <FlatList
        tabIndex={3}
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
  )
}

export default Me
