import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Layout, FlatList } from 'navigation'
import { usePaginatedQuery, CurrentUserProfileDocument } from '@wrench/common'
import Post from 'components/Post'
import { EmptyState } from 'ui'
import SettingsButton from 'features/user/components/SettingsButton'
import EditButton from 'features/user/components/EditButton'
import Header from 'features/user/components/Header'
import { TYPES } from 'ui/EmptyState/constants'
import UserProjects from 'features/user/components/UserProjects'
import { isIphone } from 'utils/platform'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

const renderItem = ({ item }) => <Post post={item.node} />

function Me() {
  const {
    data: { edges, user },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['user', 'posts'])(CurrentUserProfileDocument)

  const hasPosts = edges && edges.length > 0

  const emptyState = user && user.projects.edges.length > 0 ? TYPES.POST : TYPES.PROJECT

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }} enabled={!hasNextPage}>
      <Layout headerLeft={<SettingsButton />} search={false} headerRight={<EditButton />}>
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
          data={edges}
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

export default Me
