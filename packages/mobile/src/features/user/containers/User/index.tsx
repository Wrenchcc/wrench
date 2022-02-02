import React, { useCallback } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { usePaginatedQuery, UserDocument } from '@wrench/common'
import { Page, FlatList } from 'navigation'
import { useTranslation } from 'react-i18next'
import { useDynamicColor } from 'utils/hooks'
import { useActionSheet } from '@expo/react-native-action-sheet'
import NativeShare from 'react-native-share'
import * as Clipboard from 'expo-clipboard'
import openLink from 'utils/openLink'
import Post from 'components/Post'
import { Toast, Icon } from 'ui'
import { TOAST_TYPES } from 'utils/enums'
import { showToast } from 'navigation/banner'
import FollowingProjects from 'features/user/components/FollowingProjects'
import Header from 'features/user/components/Header'
import UserProjects from 'features/user/components/UserProjects'
import { isIphone } from 'utils/platform'
import PostSkeleton from 'components/Post/Skeleton'
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

  const dynamicColor = useDynamicColor('inverse')
  const dynamicBackgroundColor = useDynamicColor('default')
  const { showActionSheetWithOptions } = useActionSheet()

  const handleActionSheet = useCallback(() => {
    const options = ['Report', 'Copy profile URL', 'Share This Profile', 'Cancel'] // TODO: Translate

    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: 3,
        cancelButtonIndex: 4,
        tintColor: dynamicColor,
        containerStyle: {
          backgroundColor: dynamicBackgroundColor,
        },
      },
      (index) => {
        if (index === 0) {
          openLink(`mailto:report@wrench.cc?subject=Report%20user:%20${user.username}`)
        }

        // Copy link
        if (index === 1) {
          Clipboard.setString(user.dynamicLink)
          showToast({
            content: 'Link copied to clipboard',
            type: TOAST_TYPES.SUCCESS,
          })
        }

        // Share
        if (index === 2) {
          NativeShare.open({
            url: user.dynamicLink,
          }).catch(() => {})
        }
      }
    )
  }, [])

  const hasPosts = edges && edges.length > 0

  const ListHeaderComponent = error ? (
    <Toast content={t('notfound')} />
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

  const ListEmptyComponent =
    isFetching && !isRefetching ? (
      <PostSkeleton />
    ) : (
      user && !error && <FollowingProjects user={user} />
    )

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }} enabled={!hasNextPage}>
      <Page
        headerTitle={user.fullName}
        headerRight={<Icon source={share} onPress={handleActionSheet} />}
      >
        <FlatList
          initialNumToRender={1}
          spacingSeparator
          paddingHorizontal={hasPosts ? 20 : 0}
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
          data={edges}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          hasNextPage={hasNextPage}
          renderItem={renderItem}
        />
      </Page>
    </KeyboardAvoidingView>
  )
}

export default User
