import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS, Page, FlatList } from 'navigation'
import { getProject } from 'graphql/queries/project/getProject'
import Post from 'components/Post'
import { Edit, EmptyState, Title, Share, KeyboardAvoidingView } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import ProjectHeader from 'features/project/components/ProjectHeader'

function Project({
  posts,
  project,
  fetchMore,
  refetch,
  isRefetching,
  isFetching,
  hasNextPage,
  post,
}) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

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
        {project.title && <ProjectHeader project={project} spacingHorizontal={!hasPosts} />}
        {content}
      </>
    )
  }

  return (
    <KeyboardAvoidingView paddingHorizontal={0} keyboardVerticalOffset={0}>
      <Page
        headerTitle={project.title}
        headerRight={
          project.projectPermissions && project.projectPermissions.isOwner ? (
            <Edit project={project} />
          ) : (
            <Share title={project.title} url={project.dynamicLink} text />
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
    </KeyboardAvoidingView>
  )
}

export default getProject(Project)
