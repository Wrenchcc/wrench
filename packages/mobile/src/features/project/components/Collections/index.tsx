import React from 'react'
import { View } from 'react-native'
import { usePaginatedQuery, ProjectCollectionsDocument } from '@wrench/common'
import { InfiniteList, Text } from 'ui'
import Collection from 'components/Collection'
import AddCollection from 'components/AddCollection'
import Skelleton from './Skeleton'

const GUTTER = 20
const BAR_SPACE = GUTTER / 2

const styles = {
  list: {
    marginLeft: -GUTTER,
    marginRight: -GUTTER,
  },
}

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

  const renderItem = ({ item: { node }, index }) => {
    // TODO: Exclude from backend
    if (!isOwner && !node?.cover.uri) {
      return null
    }

    return (
      <Collection
        image={node.cover}
        name={node.name}
        key={node.id}
        projectId={projectId}
        id={node.id}
        slug={node.slug}
        selected={node.id === selectedId}
        onPress={onPress}
        isOwner={isOwner}
        onSave={onSave}
        style={{
          marginRight: index === edges && edges.length - 1 ? GUTTER : BAR_SPACE,
        }}
      />
    )
  }

  const ListHeaderComponent = isOwner && (
    <AddCollection style={{ marginRight: 10 }} projectId={projectId} disableModal={disableModal} />
  )

  const ListEmptyComponent = isFetching && <Skelleton />

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
      paddingVertical={0}
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
      style={styles.list}
    />
  )
}

export default React.memo(Collections)
