import React from 'react'
import { View } from 'react-native'
import Skeleton from 'ui/Skeleton'

const styles = {
  container: {
    height: 71,
    marginLeft: 10,
  },
  first: {
    marginTop: 6,
    marginBottom: 8,
  },
}

export const HashtagSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <Skeleton width="60%" height={10} style={[styles.first]} />
      <Skeleton width="40%" height={10} />
    </View>
  )
}

export default HashtagSkeleton
