import React, { useCallback } from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { usePaginatedQuery, ProjectDocument } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { Page, FlatList } from 'navigation'
import Post from 'components/Post'
import { EmptyState, Title, Share, Edit } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import ProjectHeader from 'features/project/components/ProjectHeader'
import { isIphone } from 'utils/platform'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

function Project({ slug, id, postId, project: initialProjectData, post: initialPostData }) {
  const { t } = useTranslation()

  const {
    data: { edges, post, project },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['project', 'posts'], {
    project: initialProjectData,
    post: initialPostData,
  })(ProjectDocument, {
    variables: {
      slug,
      id,
      postId,
    },
  })

  const hasPosts = post || (edges && edges.length > 0)

  const emptyState = project?.permissions.isOwner ? TYPES.PROJECT_POST : TYPES.PROJECT_NO_POSTS

  const renderItem = ({ item }) => {
    // Remove post item from list to skip dublicated
    if (post && post.id === item.node.id) {
      return null
    }

    return <Post post={item.node} avatar={false} withoutTitle />
  }

  const renderHeader = useCallback(() => {
    let content

    if (post) {
      content = (
        <>
          <Post post={post} withoutTitle />
          {hasPosts && edges && edges.length > 1 && (
            <View style={{ marginTop: -20, paddingBottom: 50 }}>
              <Title medium>{t('Project:recent')}</Title>
            </View>
          )}
        </>
      )
    }

    return (
      <>
        {project?.title && <ProjectHeader project={project} spacingHorizontal={!hasPosts} />}
        {content}
      </>
    )
  }, [post, edges, hasPosts, project])

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }} enabled={!hasNextPage}>
      <Page
        headerTitle={project?.title}
        headerRight={
          project?.permissions.isOwner ? (
            <Edit project={project} />
          ) : (
            <Share title={project?.title} url={project?.dynamicLink} text />
          )
        }
      >
        <FlatList
          initialNumToRender={1}
          spacingSeparator
          paddingHorizontal={hasPosts ? 20 : 0}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={!hasPosts && <EmptyState type={emptyState} />}
          ListHeaderComponent={renderHeader}
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

export default Project
