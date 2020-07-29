import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, CollectionsDocument } from '@wrench/common'
import { FlatList, Page, useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import Post from 'components/Post'

const renderItem = ({ item }) => <Post post={item.node} />

function Collections({ id, name, projectId }) {
  const { t } = useTranslation()
  const { showModal, navigateBack } = useNavigation()

  const navigateToEdit = () =>
    showModal(SCREENS.EDIT_COLLECTION, {
      id,
      name,
      projectId,
      onDelete: navigateBack,
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
      projectId,
      first: 3,
    },
  })

  return (
    <Page
      headerTitle={name}
      headerAnimation={false}
      headerRight={
        // TODO: Is owner
        <Text medium onPress={navigateToEdit}>
          Edit
        </Text>
      }
    >
      <FlatList
        data={edges}
        renderItem={renderItem}
        initialNumToRender={2}
        spacingSeparator
        paddingHorizontal={20}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
      />
    </Page>
  )
}

export default Collections
