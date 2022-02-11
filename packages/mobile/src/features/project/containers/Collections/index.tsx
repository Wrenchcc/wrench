import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, CollectionsDocument } from '@wrench/common'
import { FlatList, Page, useNavigation, SCREENS } from 'navigation'
import { Text, EmptyState, Share } from 'ui'
import * as Spacing from 'ui/Spacing'
import Post from 'components/Post'
import PostSkeleton from 'components/Post/Skeleton'
import { TYPES } from 'ui/EmptyState/constants'

const renderItem = ({ item }) => <Post post={item.node} withoutCollections />

function Collections({ id, name, projectId, isOwner, projectSlug, slug }) {
  const { t } = useTranslation('collections')
  const { showModal, navigateBack } = useNavigation()

  const navigateToEdit = () =>
    showModal(SCREENS.EDIT_COLLECTION, {
      id,
      name,
      projectId,
      onDelete: navigateBack,
      projectSlug,
      slug,
    })

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['collections'])(CollectionsDocument, {
    variables: {
      id,
      slug,
      projectSlug,
      projectId,
      first: 3,
    },
  })

  const emptyState = isOwner ? TYPES.COLLECTION_POST : TYPES.COLLECTION_NO_POSTS

  const ListEmptyComponent = isFetching ? (
    <>
      <PostSkeleton />
      <Spacing.Horizontally px={50} />
      <PostSkeleton />
    </>
  ) : (
    <EmptyState
      type={emptyState}
      params={{
        collectionId: id,
        projectId,
      }}
    />
  )

  const headerRight = isOwner ? (
    <Text medium onPress={navigateToEdit}>
      {t('edit')}
    </Text>
  ) : (
    <Share text url={`https://wrench.cc/project/${projectSlug}/collection/${slug}`} />
  )

  return (
    <Page headerTitle={name} disableAnimation headerRight={headerRight}>
      <FlatList
        data={edges}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        initialNumToRender={2}
        spacingSeparator
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={edges && isFetching}
        hasNextPage={hasNextPage}
      />
    </Page>
  )
}

export default Collections
