import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { usePaginatedQuery, BookmarksDocument } from '@wrench/common'
import { Page, FlatList } from 'navigation'
import { Text, Title } from 'ui'
import * as Spacing from 'ui/Spacing'
import Post from 'components/Post'
import PostSkeleton from 'components/Post/Skeleton'

const styles = {
  base: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 30,
  },
}

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

  const ListEmptyComponent =
    isFetching && !isRefetching ? (
      <>
        <PostSkeleton />
        <Spacing.Horizontally px={50} />
        <PostSkeleton />
      </>
    ) : (
      <View style={styles.base}>
        <Title style={styles.title}>{t('title')}</Title>
        <Text style={styles.description}>{t('description')}</Text>
      </View>
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
