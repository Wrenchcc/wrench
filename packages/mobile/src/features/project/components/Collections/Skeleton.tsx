import React from 'react'
import { View } from 'react-native'
import Skeleton from 'ui/Skeleton'
import * as Spacing from 'ui/Spacing'

const COUNT = 6

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

export const CollectionsSkelleton: React.FC = () => {
  return new Array(COUNT).fill({}).map((_, index) => (
    <View key={index} style={[styles.container, index === COUNT - 1 && styles.last]}>
      <Skeleton width={60} height={60} radius="round" />
      <Spacing.Horizontally px={12} />
      <Skeleton width={60} height={11} radius={0} />
    </View>
  ))
}

export default CollectionsSkelleton
