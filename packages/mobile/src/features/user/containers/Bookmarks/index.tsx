import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, BookmarksDocument } from '@wrench/common'
import { Page, FlatList } from 'navigation'
import Post from 'components/Post'
import { Base, Title, Description } from './styles'

const renderItem = ({ item }) => <Post post={item.node} />

function Bookmarks() {
  const { t } = useTranslation('bookmarks')

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['bookmarks'])(BookmarksDocument)

  return (
    <Page headerTitle={t('headerTitle')} disableAnimation>
      <FlatList
        initialNumToRender={2}
        spacingSeparator
        ListEmptyComponent={
          <Base>
            <Title>{t('title')}</Title>
            <Description>{t('description')}</Description>
          </Base>
        }
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

export default Bookmarks
