import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, FollowersDocument } from '@wrench/common'
import { FlatList, Page } from 'navigation'
import { User, NoResults } from 'ui'
import Skeleton from 'ui/User/SkeletonList'

const renderItem = ({ item }) => <User data={item.node} />

function Followers({ id }) {
  const { t } = useTranslation('followers')

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['followers'])(FollowersDocument, {
    variables: {
      projectId: id,
    },
  })

  const ListEmptyComponent = isFetching && !isRefetching ? <Skeleton /> : <NoResults />

  return (
    <Page headerTitle={t('title')} disableAnimation>
      <FlatList
        ListEmptyComponent={ListEmptyComponent}
        borderSeparator
        data={edges}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={edges && isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default Followers
