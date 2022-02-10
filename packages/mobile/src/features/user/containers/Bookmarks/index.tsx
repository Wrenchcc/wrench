import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, BookmarksDocument } from '@wrench/common'
import { Page, FlatList } from 'navigation'
import * as Spacing from 'ui/Spacing'
import Post from 'components/Post'
import PostSkeleton from 'components/Post/Skeleton'
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

  const ListEmptyComponent = isFetching ? (
    <>
      <PostSkeleton />
      <Spacing.Horizontally px={50} />
      <PostSkeleton />
    </>
  ) : (
    <Base>
      <Title>{t('title')}</Title>
      <Description>{t('description')}</Description>
    </Base>
  )

  return (
    <Page headerTitle={t('headerTitle')} disableAnimation>
      <FlatList
        initialNumToRender={2}
        spacingSeparator
        ListEmptyComponent={ListEmptyComponent}
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

export default Bookmarks
