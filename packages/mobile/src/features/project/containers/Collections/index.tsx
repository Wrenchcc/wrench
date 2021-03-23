import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, CollectionsDocument } from '@wrench/common'
import { FlatList, useNavigation, SCREENS } from 'navigation'
import { Text, EmptyState, Share } from 'ui'
import Post from 'components/Post'
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

  const hasPosts = edges?.length > 0
  const emptyState = isOwner ? TYPES.COLLECTION_POST : TYPES.COLLECTION_NO_POSTS

  return (
    // <Page
    //   headerTitle={name}
    //   headerAnimation={false}
    //   headerRight={
    //     isOwner ? (
    //       <Text medium onPress={navigateToEdit}>
    //         {t('edit')}
    //       </Text>
    //     ) : (
    //       <Share text url={`https://wrench.cc/project/${projectSlug}/collection/${slug}`} />
    //     )
    //   }
    // >
    <FlatList
      data={edges}
      renderItem={renderItem}
      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={
        <EmptyState
          type={emptyState}
          params={{
            collectionId: id,
            projectId,
          }}
        />
      }
      initialNumToRender={2}
      spacingSeparator
      paddingHorizontal={hasPosts ? 20 : 0}
      refetch={refetch}
      fetchMore={fetchMore}
      isRefetching={isRefetching}
      isFetching={isFetching}
      hasNextPage={hasNextPage}
    />
    // </Page>
  )
}

export default Collections
