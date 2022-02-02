import React from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { usePaginatedQuery, ProjectDocument } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { Page, FlatList, useNavigation } from 'navigation'
import Post from 'components/Post'
import { EmptyState, Title, Share, Edit } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import ProjectHeader from 'features/project/components/ProjectHeader'
import { isIphone } from 'utils/platform'
import PostSkeleton from 'components/Post/Skeleton'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

function Project({ slug, id, postId, project: initialProjectData, post: initialPostData }) {
  const { t } = useTranslation('project')
  const { navigateBack } = useNavigation()

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

  const hasPosts = post || edges?.length > 0
  const isOwner = project?.permissions.isOwner
  const emptyState = isOwner ? TYPES.PROJECT_POST : TYPES.PROJECT_NO_POSTS
  const filteredEdges = edges?.filter((item) => item.node.id !== post?.id)
  const reorderedEdges = post?.id
    ? [
        { node: post, recent: hasPosts && edges && edges.length > 1 },
        ...(filteredEdges ? filteredEdges : []),
      ]
    : filteredEdges

  const renderItem = ({ item }) => {
    if (item?.recent) {
      return (
        <>
          <Post post={item.node} withoutTitle />

          <View style={{ marginTop: -20, paddingBottom: 50 }}>
            <Title medium>{t('recent')}</Title>
          </View>
        </>
      )
    }

    return <Post post={item.node} avatar={false} withoutTitle />
  }

  const ListEmptyComponent =
    isFetching && !isRefetching ? (
      <PostSkeleton />
    ) : (
      !hasPosts && <EmptyState type={emptyState} params={{ id: project?.id }} />
    )

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }} enabled={!hasNextPage}>
      <Page
        headerTitle={project?.title}
        headerRight={
          isOwner ? (
            <Edit project={project} onDeleteCallback={navigateBack} />
          ) : (
            <Share title={project?.title} url={project?.dynamicLink} text />
          )
        }
      >
        <FlatList
          initialNumToRender={2}
          spacingSeparator
          paddingHorizontal={hasPosts ? 20 : 0}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={ListEmptyComponent}
          ListHeaderComponent={
            project?.title && <ProjectHeader project={project} spacingHorizontal={!hasPosts} />
          }
          data={reorderedEdges}
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

export default Project
