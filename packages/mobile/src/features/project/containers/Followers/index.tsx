import React from 'react'
import { useTranslation } from 'react-i18next'
import { getFollowers } from 'graphql/queries/getFollowers'
import { FlatList, PageLayout } from 'navigation'
import { User, NoResults } from 'ui'

const renderItem = ({ item }) => <User data={item.node} />

function Followers({ followers, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const { t } = useTranslation()

  return (
    <PageLayout headerTitle={t('Followers:title')} headerAnimation={false}>
      <FlatList
        ListEmptyComponent={<NoResults />}
        borderSeparator
        data={followers}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </PageLayout>
  )
}

export default getFollowers(Followers)
