import React from 'react'
import { View as MotiView } from 'moti'
import { usePaginatedQuery, ProjectCollectionsDocument } from '@wrench/common'
import { InfiniteList } from 'ui'
import AddCollection from 'components/AddCollection'
import CollectionsSkelleton from './Skeleton'
import { Collection, GUTTER } from './styles'

function Collections({
  isOwner,
  projectId,
  projectSlug,
  onPress,
  onSave,
  selectedId,
  disableModal = false,
}) {
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
      first: 7,
    },
  })

  let content = (
    <CollectionsSkelleton
      empty={!isFetching && isOwner && !edges?.length}
      isOwner={isOwner}
      projectId={projectId}
    />
  )

  const renderItem = ({ item: { node }, index }) => (
    <Collection
      image={node.cover}
      name={node.name}
      key={node.id}
      last={index === edges && edges.length - 1}
      projectId={projectId}
      projectSlug={projectSlug}
      id={node.id}
      slug={node.slug}
      selected={node.id === selectedId}
      onPress={onPress}
      isOwner={isOwner}
      onSave={onSave}
    />
  )

  if (!edges?.length && !isOwner) {
    content = null
  }

  if (edges?.length) {
    content = (
      <MotiView
        from={{ height: 0, opacity: 0 }}
        animate={{ height: 85, opacity: 1 }}
        delay={200}
        transition={{
          type: 'timing',
          duration: 300,
        }}
      >
        <InfiniteList
          initialNumToRender={8}
          data={edges}
          horizontal
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            isOwner && (
              <AddCollection
                style={{ marginRight: 10 }}
                projectId={projectId}
                disableModal={disableModal}
              />
            )
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
      </MotiView>
    )
  }

  return content
}

export default Collections
