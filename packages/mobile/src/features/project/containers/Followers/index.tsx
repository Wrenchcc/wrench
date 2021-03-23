import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, FollowersDocument } from '@wrench/common'
import { FlatList } from 'navigation'
import { User, NoResults } from 'ui'
import UserSkeletonList from 'ui/User/SkeletonList'

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

  if (isFetching && !edges) {
    return <UserSkeletonList />
  }

  return (
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
}

export default Followers
