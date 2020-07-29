import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, LikesDocument } from '@wrench/common'
import { FlatList, Page } from 'navigation'
import { User, NoResults } from 'ui'
import UserPlaceholderCollection from 'ui/User/PlaceholderCollection'

const renderItem = ({ item }) => <User data={item.node} />

function Sparks({ id }) {
  const { t } = useTranslation()

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['likes'])(LikesDocument, {
    variables: {
      postId: id,
    },
  })

  const content =
    isFetching && !edges ? (
      <UserPlaceholderCollection />
    ) : (
      <FlatList
        ListEmptyComponent={<NoResults />}
        borderSeparator
        data={edges}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    )

  return (
    <Page headerTitle={t('Sparks:title')} headerAnimation={false}>
      {content}
    </Page>
  )
}

export default Sparks
