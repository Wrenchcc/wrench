import React from 'react'
import { ScrollView } from 'react-native'
import Skeleton from 'ui/Skeleton'

const COUNT = 5

const styles = {
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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        paddingBottom: 10,
        paddingTop: 10,
      }}
    >
      {new Array(COUNT).fill({}).map((_, index) => (
        <Skeleton
          key={index}
          width={100}
          height={40}
          radius={0}
          style={[styles.category, index === 0 && styles.first, index === COUNT - 1 && styles.last]}
        />
      ))}
    </ScrollView>
  )
}

export default CategoriesSkeleton
