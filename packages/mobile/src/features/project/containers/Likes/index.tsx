import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, LikesDocument } from '@wrench/common'
import { FlatList, Page } from 'navigation'
import { User, NoResults } from 'ui'
import UserSkeletonList from 'ui/User/SkeletonList'

const renderItem = ({ item }) => <User data={item.node} />

function Sparks({ id }) {
  const { t } = useTranslation('sparks')

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

  const ListEmptyComponent = isFetching && !edges ? <UserSkeletonList /> : <NoResults />

  return (
    <Page headerTitle={t('title')} disableAnimation>
      <FlatList
        ListEmptyComponent={ListEmptyComponent}
        borderSeparator
        data={edges}
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

export default Sparks
