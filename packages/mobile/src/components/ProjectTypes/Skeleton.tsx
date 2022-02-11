import React from 'react'
import { View } from 'react-native'
import Skeleton from 'ui/Skeleton'

const COUNT = 5

const styles = {
  container: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  },
  category: {
    marginRight: 10,
  },
  first: {
    marginLeft: 20,
  },
  last: {
    marginRight: 20,
  },
}

export const CategoriesSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {new Array(COUNT).fill({}).map((_, index) => (
        <Skeleton
          key={index}
          width={100}
          height={35}
          radius={0}
          style={[styles.category, index === 0 && styles.first, index === COUNT - 1 && styles.last]}
        />
      ))}
    </View>
  )
}

export default CategoriesSkeleton
