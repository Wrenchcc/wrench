import React, { useCallback } from 'react'
import { usePaginatedQuery, UserDocument } from '@wrench/common'
import { Page, FlatList } from 'navigation'
import { useTranslation } from 'react-i18next'
import { useDynamicColor } from 'utils/hooks'
import { useActionSheet } from '@expo/react-native-action-sheet'
import NativeShare from 'react-native-share'
import * as Clipboard from 'expo-clipboard'
import openLink from 'utils/openLink'
import * as Spacing from 'ui/Spacing'
import Post from 'components/Post'
import { Toast, Icon } from 'ui'
import { TOAST_TYPES } from 'utils/enums'
import { showToast } from 'navigation/banner'
import FollowingProjects from 'features/user/components/FollowingProjects'
import Header from 'features/user/components/Header'
import UserProjects from 'features/user/components/UserProjects'
import UserProjectSkeleton from 'features/user/components/UserProjects/Skeleton'
import PostSkeleton from 'components/Post/Skeleton'
import { share } from 'images'

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
      username: initialUserData?.username,
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
        destructiveButtonIndex: 0,
        cancelButtonIndex: 3,
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
  }, [showActionSheetWithOptions])

  const ListHeaderComponent = error ? (
    <Toast content={t('notfound')} />
  ) : (
    user && (
      <>
        <Header
          firstName={user.firstName}
          lastName={user.lastName}
          avatarUrl={user.avatarUrl}
          bio={user.bio}
          website={user.website}
          location={user.location}
        />

        {user.projects && <UserProjects projects={user.projects} />}
      </>
    )
  )
  const moreThanOneProject = initialUserData?.projectCount > 1
  const haveProject = initialUserData?.projectCount
  const havePost = initialUserData?.havePost

  const SkeletonComponent = () => {
    if (moreThanOneProject) {
      return (
        <>
          <UserProjectSkeleton />
          <PostSkeleton />
        </>
      )
    }

    if (havePost) {
      return <PostSkeleton />
    }

    if (!haveProject) {
      return null
    }

    return (
      <>
        <PostSkeleton />
        <Spacing.Horizontally px={50} />
        <PostSkeleton />
      </>
    )
  }

  const ListEmptyComponent = isFetching ? (
    <SkeletonComponent />
  ) : (
    user && !error && <FollowingProjects user={user} />
  )

  const headerRight = <Icon source={share} onPress={handleActionSheet} />

  return (
    <Page headerTitle={user?.fullName} headerRight={headerRight}>
      <FlatList
        initialNumToRender={1}
        spacingSeparator
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        data={edges}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={edges && isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default User
