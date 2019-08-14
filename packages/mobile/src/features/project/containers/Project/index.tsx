import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'ramda'
import { useNavigation, SCREENS, Page, FlatList } from 'navigation'
import { getProject } from 'graphql/queries/project/getProject'
import Post from 'components/Post'
import { Edit, EmptyState, Title, Share, Text } from 'ui'
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

  const hasPosts = !isEmpty(post) || (posts && posts.length > 0)

  const emptyState =
    project.permissions && project.permissions.isOwner ? TYPES.PROJECT_POST : TYPES.PROJECT_NO_POSTS

  const renderItem = ({ item }) => {
    // Remove post item from list to skip dublicated
    if (post && post.id === item.node.id) {
      return null
    }

    return <Post post={item.node} avatar={false} withoutTitle />
  }

  const renderHeader = useCallback(() => {
    let content

    if (!isEmpty(post)) {
      content = (
        <>
          <Post post={post} withoutTitle />
          {hasPosts && posts && posts.length > 1 && (
            <View style={{ paddingTop: 40 }}>
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
  }, [post, posts, hasPosts, project])

  return (
    <Page
      headerTitle={project.title}
      onScrollChange={([scrollY]) => console.log(scrollY)}
      headerRight={
        project.permissions && project.permissions.isOwner ? (
          <Edit project={project} />
        ) : (
          <>
            <Share title={project.title} url={project.dynamicLink} text />
            <Text medium>Follow</Text>
          </>
        )
      }
    >
      <FlatList
        initialNumToRender={1}
        spacingSeparator
        paddingHorizontal={hasPosts ? 20 : 0}
        contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
        ListEmptyComponent={!hasPosts && <EmptyState type={emptyState} />}
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

export default getProject(Project)
