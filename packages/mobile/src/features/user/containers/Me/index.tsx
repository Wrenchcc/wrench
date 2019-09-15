import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Layout, FlatList } from 'navigation'
import { useQuery, CURRENT_USER_PROJECTS_QUERY } from 'gql'
import { getCurrentUserProfile } from 'graphql/queries/user/getCurrentUser'
import Post from 'components/Post'
import { EmptyState } from 'ui'
import SettingsButton from 'features/user/components/SettingsButton'
import Header from 'features/user/components/Header'
import { TYPES } from 'ui/EmptyState/constants'
import UserProjects from 'features/user/components/UserProjects'
import { isIphone } from 'utils/platform'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

const renderItem = ({ item }) => <Post post={item.node} />

function Me({ posts, user, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const hasPosts = posts && posts.length > 0

  const { data } = useQuery(CURRENT_USER_PROJECTS_QUERY, {
    fetchPolicy: 'cache-only',
  })

  const emptyState = data.user.projects.edges.length > 0 ? TYPES.POST : TYPES.PROJECT

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }} enabled={!hasNextPage}>
      <Layout headerLeft={<SettingsButton />} search={false}>
        <FlatList
          tabIndex={3}
          initialNumToRender={1}
          spacingSeparator
          paddingHorizontal={hasPosts ? 20 : 0}
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={
            user && (
              <>
                <Header
                  firstName={user.firstName}
                  lastName={user.lastName}
                  avatarUrl={user.avatarUrl}
                  spacingHorizontal={!hasPosts}
                  bio={user.bio}
                  website={user.website}
                  location={user.location}
                />

                <UserProjects projects={user.projects} spacingHorizontal={!hasPosts} />
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
    </KeyboardAvoidingView>
  )
}

export default getCurrentUserProfile(Me)
