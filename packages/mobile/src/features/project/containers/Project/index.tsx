import React, { useCallback } from 'react'
import { View } from 'react-native'
import { compose } from 'react-apollo'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS, Page, FlatList } from 'navigation'
import { getProject } from 'graphql/queries/project/getProject'
import { followProject } from 'graphql/mutations/project/followProject'
import Post from 'components/Post'
import { Avatar, Edit, EmptyState, Title } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import Header from 'features/project/components/Header'
import Footer from 'features/project/components/Footer'

function Project({
  posts,
  project,
  followProject: followProjectMutation,
  fetchMore,
  refetch,
  isRefetching,
  isFetching,
  hasNextPage,
  post,
}) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  // TODO: username is not return in time, use cache?
  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.USER, {
        username: project.user && project.user.username,
      }),
    [project.user, project]
  )

  const handleFollow = useCallback(() => followProjectMutation(project.id), [project])

  const hasPosts = posts && posts.length > 0
  const emptyState =
    project.projectPermissions && project.projectPermissions.isOwner
      ? TYPES.PROJECT_POST
      : TYPES.PROJECT_NO_POSTS

  const renderItem = ({ item }) => {
    // Remove post item from list to skip dublicated
    if (post && post.id === item.node.id) {
      return null
    }

    return <Post post={item.node} avatar={false} withoutTitle />
  }

  const renderHeader = () => {
    let content

    if (post) {
      content = (
        <>
          <Post post={post} withoutTitle />
          {hasPosts && posts.length > 1 && (
            <View style={{ paddingTop: 40, paddingBottom: 30 }}>
              <Title medium>{t('Project:recent')}</Title>
            </View>
          )}
        </>
      )
    }

    return (
      <>
        {project.title && <Header project={project} spacingHorizontal={!hasPosts} />}
        {content}
      </>
    )
  }

  return (
    <Page
      headerTitle={project.title}
      headerRight={
        project.projectPermissions && project.projectPermissions.isOwner ? (
          <Edit project={project} />
        ) : (
          <Avatar uri={(project.user && project.user.avatarUrl) || ''} onPress={handleNavigation} />
        )
      }
      stickyFooter={
        project.projectPermissions && (
          <Footer
            name={project.title}
            dynamicLink={project.dynamicLink}
            following={project.projectPermissions.isFollower}
            isOwner={project.projectPermissions.isOwner}
            onFollowPress={handleFollow}
          />
        )
      }
    >
      <FlatList
        initialNumToRender={1}
        spacingSeparator
        paddingHorizontal={hasPosts ? 20 : 0}
        contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
        ListEmptyComponent={<EmptyState type={emptyState} />}
        ListHeaderComponent={renderHeader}
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default compose(
  getProject,
  followProject
)(Project)
