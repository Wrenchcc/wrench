import React from 'react'
import { View } from 'react-native'
import Skeleton from 'ui/Skeleton'
import * as Spacing from 'ui/Spacing'

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
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
        <Skeleton width={'70%'} height={10} />
        <Spacing.Horizontally px={10} />
        <Skeleton width={100} height={10} />
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}
      >
        <Skeleton width={40} height={40} radius={0} />
      </View>
    </View>
  )
}

export default NotificationSkeleton
