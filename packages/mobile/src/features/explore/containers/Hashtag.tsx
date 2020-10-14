import React from 'react'
import { usePaginatedQuery, HashtagDocument } from '@wrench/common'
import Post from 'components/Post'
import { Page, FlatList } from 'navigation'

const renderItem = ({ item }) => <Post post={item.node} />

function Hashtags({ slug }) {
  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['hashtag', 'posts'])(HashtagDocument, {
    variables: {
      slug,
    },
  })

  return (
    <Page headerTitle={`#${slug}`} headerAnimation={false}>
      <FlatList
        initialNumToRender={2}
        paddingBottom={40}
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

export default Hashtags
