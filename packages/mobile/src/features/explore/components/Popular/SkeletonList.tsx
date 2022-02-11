import React from 'react'
import { View } from 'react-native'
import Skeleton from 'ui/Skeleton'
import * as Spacing from 'ui/Spacing'
import { GUTTER } from './styles'

const COUNT = 3

const styles = {
  base: {
    flexDirection: 'row',
    marginLeft: -GUTTER,
    marginRight: -GUTTER,
  },
  container: {
    marginRight: 10,
  },
  first: {
    marginLeft: 20,
  },
  last: {
    marginRight: 20,
  },
}

export const SkeletonList: React.FC = () => {
  return (
    <View style={styles.base}>
      {new Array(COUNT).fill({}).map((_, index) => (
        <View
          key={index}
          style={[
            styles.container,
            index === 0 && styles.first,
            index === COUNT - 1 && styles.last,
          ]}
        >
          <Skeleton width={180} height={180} radius={0} />
          <Spacing.Horizontally px={10} />
          <Skeleton width={90} radius={0} height={10} />
          <Spacing.Horizontally px={5} />
          <Skeleton width={60} radius={0} height={10} />
        </View>
      ))}
    </View>
  )
}

export default SkeletonList
