import React from 'react'
import { usePaginatedQuery, ProjectCollectionsDocument } from '@wrench/common'
import { InfiniteList } from 'ui'
import AddCollection from 'components/AddCollection'
import Placeholder from './Placeholder'
import { Collection, GUTTER } from './styles'

function Collections({ isOwner, projectId }) {
  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['projectCollections'])(ProjectCollectionsDocument, {
    variables: {
      projectId,
      first: 8,
    },
  })

  let content = (
    <Placeholder
      empty={!isFetching && isOwner && !edges?.length}
      isOwner={isOwner}
      projectId={projectId}
    />
  )

  const renderItem = ({ item, index }) => {
    const collection = item.node

    return (
      <Collection
        image={collection.cover}
        name={collection.name}
        key={collection.id}
        last={index === edges && edges.length - 1}
      />
    )
  }

  if (!edges?.length && !isOwner) {
    content = null
  }

  if (edges?.length) {
    content = (
      <InfiniteList
        initialNumToRender={8}
        data={edges}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          isOwner && <AddCollection style={{ marginRight: 10 }} projectId={projectId} />
        }
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        loaderInset={10}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />
    )
  }

  return content
}

export default Collections
