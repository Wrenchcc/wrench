import React from 'react'
import { View } from 'react-native'
import Skeleton from 'ui/Skeleton'
import * as Spacing from 'ui/Spacing'

const styles = {
  container: {
    height: 71,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  content: {
    marginTop: 5,
    marginLeft: 10,
  },
}

export const NotificationSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton width={40} height={40} radius="round" />

      <View style={styles.content}>
        <Skeleton width={150} height={10} />
        <Spacing.Horizontally px={10} />
        <Skeleton width={100} height={10} />
      </View>
    </View>
  )
}

export default NotificationSkeleton
