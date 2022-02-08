import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Layout,
  FlatList,
  SCREENS,
  useNavigation,
  useScrollToTop,
  withScrollableContext,
} from 'navigation'
import { usePaginatedQuery, CurrentUserProfileDocument } from '@wrench/common'
import Post from 'components/Post'
import { EmptyState, Icon } from 'ui'
import Header from 'features/user/components/Header'
import { TYPES } from 'ui/EmptyState/constants'
import UserProjects from 'features/user/components/UserProjects'
import { menu, add } from 'images'
import Skeleton from './Skeleton'

const renderItem = ({ item }) => <Post post={item.node} />

function Me() {
  const { t } = useTranslation(['me', 'select-project', 'edit-collection'])

  useScrollToTop(SCREENS.ME)

  const {
    data: { edges, user },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['user', 'posts'])(CurrentUserProfileDocument)

  const { showHalfpanel, navigate, showModal } = useNavigation()

  const navigateEditProfile = useCallback(() => showModal(SCREENS.EDIT_PROFILE), [])
  const navigateSettings = useCallback(() => navigate(SCREENS.SETTINGS), [])
  const navigateBookmarks = useCallback(() => navigate(SCREENS.BOOKMARKS), [])
  const navigateAddProject = useCallback(() => showModal(SCREENS.ADD_PROJECT), [])
  const navigateToAddPost = useCallback(() => showModal(SCREENS.ADD_MEDIA), [])

  const hasPosts = edges?.length > 0

  const emptyState = user?.projects.edges.length > 0 ? TYPES.POST : TYPES.PROJECT

  const addOptions = [
    {
      title: t('select-project:create'),
      onPress: navigateAddProject,
    },
  ]

  if (user?.projects.edges.length > 0) {
    addOptions.push({
      title: t('edit-collection:add'),
      onPress: navigateToAddPost,
    })
  }

  const handleRightMenu = useCallback(
    () =>
      showHalfpanel({
        height: 280,
        data: [
          {
            title: t('edit'),
            onPress: navigateEditProfile,
          },
          {
            title: t('settings'),
            onPress: navigateSettings,
          },
          {
            title: t('bookmarks'),
            onPress: navigateBookmarks,
          },
        ],
      }),
    []
  )

  const handleLeftMenu = useCallback(
    () =>
      showHalfpanel({
        height: 240,
        data: addOptions,
      }),
    [addOptions]
  )

  const ListHeaderComponent = user && (
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

  const ListEmptyComponent =
    isFetching && !hasPosts ? <Skeleton /> : <EmptyState type={emptyState} />

  return (
    <Layout
      headerLeft={<Icon source={add} onPress={handleLeftMenu} />}
      headerRight={<Icon source={menu} onPress={handleRightMenu} />}
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
    </Layout>
  )
}

export default withScrollableContext(Me)
