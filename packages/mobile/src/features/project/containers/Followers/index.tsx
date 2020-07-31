import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, FollowersDocument } from '@wrench/common'
import { FlatList, Page } from 'navigation'
import { User, NoResults } from 'ui'
import UserPlaceholderCollection from 'ui/User/PlaceholderCollection'

function Followers({ id }) {
  const { t } = useTranslation()

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

  const renderItem = ({ item }) => <User data={item.node} />

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
    <Page headerTitle={t('Followers:title')} headerAnimation={false}>
      {content}
    </Page>
  )
}

export default Followers
