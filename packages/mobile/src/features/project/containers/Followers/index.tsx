import React from 'react'
import { useTranslation } from 'react-i18next'
import { getFollowers } from 'services/graphql/queries/getFollowers'
import { FlatList, Page } from 'navigation'
import { User, NoResults } from 'ui'

const renderItem = ({ item }) => <User data={item.node} />

function Followers({ followers, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const { t } = useTranslation()

  return (
    <Page headerTitle={t('Followers:title')} headerAnimation={false}>
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
    </Page>
  )
}

export default getFollowers(Followers)
