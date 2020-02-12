import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, UserDocument } from '@wrench/common'
import { Page, FlatList } from 'navigation'
import { NAVIGATION_COMPONENTS } from 'navigation/constants'
import Post from 'components/Post'
import { Banner } from 'ui'
import FollowingProjects from 'features/user/components/FollowingProjects'
import Header from 'features/user/components/Header'
import UserProjects from 'features/user/components/UserProjects'
import { isIphone } from 'utils/platform'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

const renderItem = ({ item }) => <Post post={item.node} />

function User({ user: initialUserData }) {
  const { t } = useTranslation()

  const {
    data: { edges, user },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
    error,
  } = usePaginatedQuery(['user', 'posts'], {
    user: initialUserData,
  })(UserDocument, {
    variables: {
      username: initialUserData.username,
    },
  })

  const hasPosts = edges && edges.length > 0

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

        {user.projects && <UserProjects projects={user.projects} spacingHorizontal={!hasPosts} />}
      </>
    )
  )

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }} enabled={!hasNextPage}>
      <Page
        headerTitle={user.fullName}
        headerRight={{
          component: {
            name: NAVIGATION_COMPONENTS.SHARE_BUTTON,
            passProps: {
              text: true,
              url: user.dynamicLink,
              title: user.fullName,
            },
          },
        }}
      >
        <FlatList
          initialNumToRender={1}
          spacingSeparator
          paddingHorizontal={hasPosts ? 20 : 0}
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={user && !error && <FollowingProjects user={user} />}
          data={edges}
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

export default User
