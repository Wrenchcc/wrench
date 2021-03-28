import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'
import Share from 'react-native-share'
import { usePaginatedQuery, UserDocument } from '@wrench/common'
import { FlatList, useNavigationButtonPress } from 'navigation'
import Post from 'components/Post'
import { Banner } from 'ui'
import FollowingProjects from 'features/user/components/FollowingProjects'
import Header from 'features/user/components/Header'
import UserProjects from 'features/user/components/UserProjects'
import { isIphone } from 'utils/platform'
import { share } from 'images'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

const renderItem = ({ item }) => <Post post={item.node} />

function User({ user: initialUserData }) {
  const { t } = useTranslation('user')

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

  useNavigationButtonPress(({ buttonId }) => {
    if (buttonId === 'share') {
      // track(events.PROJECT_SHARE_OPEN)

      Share.open({
        title: user.fullName,
        url: user.dynamicLink,
      }).catch(() => {
        // track(events.PROJECT_SHARE_CLOSED)
      })
    }
  })

  const hasPosts = edges && edges.length > 0

  const ListHeaderComponent = error ? (
    <Banner content={t('notfound')} />
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
    </KeyboardAvoidingView>
  )
}

User.options = {
  topBar: {
    // title: {
    //   text: 'Pontus Abrahamsson',
    // },
    rightButtons: [
      {
        id: 'share',
        icon: share,
      },
    ],
  },
}

export default User
