import React, { useCallback } from 'react'
import { View } from 'react-native'
import { usePaginatedQuery, ProjectDocument } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { Page, FlatList, useNavigation } from 'navigation'
import { useDynamicColor } from 'utils/hooks'
import { useActionSheet } from '@expo/react-native-action-sheet'
import NativeShare from 'react-native-share'
import * as Clipboard from 'expo-clipboard'
import openLink from 'utils/openLink'
import Post from 'components/Post'
import { TOAST_TYPES } from 'utils/enums'
import { showToast } from 'navigation/banner'
import { EmptyState, Title, Edit, Icon } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import ProjectHeader from 'features/project/components/ProjectHeader'
import PostSkeleton from 'components/Post/Skeleton'
import { share } from 'images'

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

  const dynamicColor = useDynamicColor('inverse')
  const dynamicBackgroundColor = useDynamicColor('default')
  const { showActionSheetWithOptions } = useActionSheet()

  const handleActionSheet = useCallback(() => {
    const options = ['Report', 'Copy project URL', 'Share This Project', 'Cancel'] // TODO: Translate

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
          openLink(`mailto:report@wrench.cc?subject=Report%20project:%20${project.id}`)
        }

        // Copy link
        if (index === 1) {
          Clipboard.setString(project.dynamicLink)
          showToast({
            content: 'Link copied to clipboard',
            type: TOAST_TYPES.SUCCESS,
          })
        }

        // Share
        if (index === 2) {
          NativeShare.open({
            url: project.dynamicLink,
          }).catch(() => {})
        }
      }
    )
  }, [showActionSheetWithOptions])

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

  const ListHeaderComponent = useCallback(() => {
    return <ProjectHeader project={project} />
  }, [])

  const headerRight = isOwner ? (
    <Edit project={project} onDeleteCallback={navigateBack} />
  ) : (
    <Icon source={share} onPress={handleActionSheet} />
  )

  return (
    <Page headerTitle={project?.title} headerRight={headerRight}>
      <FlatList
        initialNumToRender={2}
        spacingSeparator
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        data={reorderedEdges}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default Project
