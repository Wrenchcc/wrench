import React from 'react'
import { View } from 'react-native'
import { usePaginatedQuery, ProjectCollectionsDocument } from '@wrench/common'
import { InfiniteList, Text } from 'ui'
import AddCollection from 'components/AddCollection'
import Skelleton from './Skeleton'
import { Collection, GUTTER } from './styles'

function Collections({ isOwner, projectId, onPress, onSave, selectedId, disableModal = false }) {
  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['projectCollections'])(ProjectCollectionsDocument, {
    variables: {
      projectId,
      first: 7,
    },
  })

  const renderItem = ({ item: { node }, index }) => (
    <Collection
      image={node.cover}
      name={node.name}
      key={node.id}
      last={index === edges && edges.length - 1}
      projectId={projectId}
      id={node.id}
      slug={node.slug}
      selected={node.id === selectedId}
      onPress={onPress}
      isOwner={isOwner}
      onSave={onSave}
    />
  )

  const ListHeaderComponent = isOwner && (
    <AddCollection style={{ marginRight: 10 }} projectId={projectId} disableModal={disableModal} />
  )

  const ListEmptyComponent = isFetching && !edges && <Skelleton />

  // TODO: Translate
  if (!isFetching && isOwner && !edges) {
    return (
      <View style={{ marginBottom: 50 }}>
        <AddCollection
          style={{ marginRight: 10 }}
          projectId={projectId}
          disableModal={disableModal}
        />
        <View style={{ marginTop: 40 }}>
          <Text medium style={{ marginBottom: 5 }}>
            Collections
          </Text>
          <Text fontSize={15}>
            Keep better track of your progress and add your posts to collections
          </Text>
        </View>
      </View>
    )
  }

  if (!isOwner && !edges) {
    return null
  }

  return (
    <InfiniteList
      ListEmptyComponent={ListEmptyComponent}
      initialNumToRender={7}
      data={edges}
      horizontal
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      fetchMore={fetchMore}
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

export default React.memo(Collections)
