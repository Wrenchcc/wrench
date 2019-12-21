import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { getUserByUsername } from 'services/graphql/queries/user/getUser'
import { Page, FlatList } from 'navigation'
import Post from 'components/Post'
import { Share, Banner } from 'ui'
import FollowingProjects from 'features/user/components/FollowingProjects'
import Header from 'features/user/components/Header'
import UserProjects from 'features/user/components/UserProjects'
import { isIphone } from 'utils/platform'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

const renderItem = ({ item }) => <Post post={item.node} />

function User({
  posts,
  user = {},
  fetchMore,
  refetch,
  isRefetching,
  isFetching,
  hasNextPage,
  error,
}) {
  const { t } = useTranslation()
  const hasPosts = posts && posts.length > 0

  const ListHeaderComponent = error ? (
    <Banner content={t('UserProfile:notfound')} />
  ) : (
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
  )

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }} enabled={!hasNextPage}>
      <Page
        headerTitle={user.fullName}
        headerRight={
          user.dynamicLink && <Share title={user.fullName} url={user.dynamicLink} text />
        }
      >
        <FlatList
          initialNumToRender={1}
          spacingSeparator
          paddingHorizontal={hasPosts ? 20 : 0}
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={user && !error && <FollowingProjects user={user} />}
          data={posts}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          renderItem={renderItem}
        />
      </Page>
    </KeyboardAvoidingView>
  )
}

export default getUserByUsername(User)
