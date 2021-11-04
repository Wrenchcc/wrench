import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from 'ui'
import { GUTTER } from './styles'
import AddCollection from 'components/AddCollection'
import Skeleton from 'ui/Skeleton'
import * as Spacing from 'ui/Spacing'

const COUNT = 7

const styles = {
  container: {
    marginRight: 10,
  },
  first: {
    marginLeft: 20,
  },
  last: {
    marginRight: 20,
  },
  title: {
    marginTop: 12,
  },
}

export const CollectionsSkelleton: React.FC = ({
  empty,
  isOwner,
  projectId,
  isLoading,
  disableModal,
}) => {
  return (
    <>
      {empty && (
        <View style={{ marginBottom: 30 }}>
          <Text medium style={{ marginBottom: 5 }}>
            Collections
          </Text>
          <Text fontSize={15}>
            Keep better track of your progress and add your posts to collections
          </Text>
        </View>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      >
        {isOwner && (
          <View style={[styles.container, styles.first, { height: 90 }]}>
            <AddCollection projectId={projectId} disableModal={disableModal} />
          </View>
        )}
        {isLoading &&
          new Array(COUNT).fill({}).map((_, index) => (
            <View
              key={index}
              style={[
                styles.container,
                index === COUNT - 1 && styles.last,
                index === 0 && !isOwner && styles.first,
              ]}
            >
              <Skeleton width={60} height={60} radius="round" />
              <Spacing.Horizontally px={12} />
              <Skeleton width={60} height={11} radius={0} />
            </View>
          ))}
      </ScrollView>
    </>
  )
}

export default CollectionsSkelleton
