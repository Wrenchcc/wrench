import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, ProjectDocument } from '@wrench/common'
import { FlatList, Page, useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'

function Collection({ id, name, projectId }) {
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
  } = usePaginatedQuery(['project', 'posts'])(ProjectDocument, {
    variables: {
      id,
      first: 8,
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
        renderItem={() => null}
        numColumns={2}
        initialNumToRender={8}
        paddingHorizontal={10}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
      />
    </Page>
  )
}

export default Collection
