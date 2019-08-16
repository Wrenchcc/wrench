import React from 'react'
import { Layout, FlatList } from 'navigation'
import { useQuery, CURRENT_USER_PROJECTS_QUERY } from 'gql'
import { getCurrentUserProfile } from 'graphql/queries/user/getCurrentUser'
import Post from 'components/Post'
import { EmptyState } from 'ui'
import SettingsButton from 'features/user/components/SettingsButton'
import Header from 'features/user/components/Header'
import { TYPES } from 'ui/EmptyState/constants'

const renderItem = ({ item }) => <Post post={item.node} />

function Me({ posts, user, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const hasPosts = posts && posts.length > 0
  const fullScreen = hasPosts || (isFetching && !posts.length)

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

export default getCurrentUserProfile(Me)
