import React, { useRef, useCallback } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Layout, FlatList, SCREENS, useScrollToTop, useNavigation } from 'navigation'
import { usePaginatedQuery, CurrentUserProfileDocument } from '@wrench/common'
import Post from 'components/Post'
import { EmptyState, Icon } from 'ui'
import Header from 'features/user/components/Header'
import { TYPES } from 'ui/EmptyState/constants'
import UserProjects from 'features/user/components/UserProjects'
import { isIphone } from 'utils/platform'
import { menu } from 'images'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

const renderItem = ({ item }) => <Post post={item.node} />

function Me() {
  const { t } = useTranslation(['me', 'select-project'])
  const scrollRef = useRef(null)

  const {
    data: { edges, user },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['user', 'posts'])(CurrentUserProfileDocument)

  const { showHalfpanel, navigate, showModal } = useNavigation()

  useScrollToTop(scrollRef, SCREENS.ME)

  const navigateEditProfile = useCallback(() => showModal(SCREENS.EDIT_PROFILE), [])
  const navigateSettings = useCallback(() => navigate(SCREENS.SETTINGS), [])
  const navigateBookmarks = useCallback(() => navigate(SCREENS.BOOKMARKS), [])
  const navigateAddProject = useCallback(() => showModal(SCREENS.ADD_PROJECT), [])

  const hasPosts = edges && edges.length > 0

  const emptyState = user && user.projects.edges.length > 0 ? TYPES.POST : TYPES.PROJECT

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }} enabled={!hasNextPage}>
      <Layout
        headerLeft={<View />}
        headerRight={
          <Icon
            source={menu}
            onPress={() =>
              showHalfpanel({
                height: 330,
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
                  {
                    title: t('select-project:create'),
                    onPress: navigateAddProject,
                  },
                ],
              })
            }
          />
        }
      >
        <FlatList
          ref={scrollRef}
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
