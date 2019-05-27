import React, { useCallback } from 'react'
import { View } from 'react-native'
import { compose } from 'react-apollo'
import { useNavigation, SCREENS, PageLayout, FlatList } from 'navigation'
import withTranslation from 'i18n/withTranslation'
import { getProject } from 'graphql/queries/project/getProject'
import { followProject } from 'graphql/mutations/project/followProject'
import { Post, Avatar, Edit, EmptyState, Title } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import Header from 'features/project/components/Header'
import Footer from 'features/project/components/Footer'

function Project({
  posts,
  project,
  followProject,
  fetchMore,
  refetch,
  isRefetching,
  isFetching,
  hasNextPage,
  post,
  t,
}) {
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(() => navigate(SCREENS.USER, {
    username: project.user.username,
  }))

  const hasPosts = posts && posts.length > 0
  const emptyState = project.projectPermissions && project.projectPermissions.isOwner
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
    <PageLayout
      title={project.title}
      headerRight={
        project.projectPermissions && project.projectPermissions.isOwner ? (
          <Edit />
        ) : (
          <Avatar uri={(project.user && project.user.avatarUrl) || ''} onPress={handleNavigation} />
        )
      }
      footer={
        project.projectPermissions && (
          <Footer
            name={project.title}
            dynamicLink={project.dynamicLink}
            following={project.projectPermissions.isFollower}
            isOwner={project.projectPermissions.isOwner}
            onFollowPress={() => followProject(project.id)}
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
        isFetching={false && isFetching}
        hasNextPage={false && hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={renderItem}
      />
    </PageLayout>
  )
}

export default compose(
  getProject,
  followProject,
  withTranslation('Project')
)(Project)
