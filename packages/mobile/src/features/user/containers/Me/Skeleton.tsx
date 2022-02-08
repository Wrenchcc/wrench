import React from 'react'
import { View } from 'react-native'
import Skeleton from 'ui/Skeleton'
import * as Spacing from 'ui/Spacing'
import PostSkeleton from 'components/Post/Skeleton'

const styles = {
  container: {
    // position: 'absolute',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    // zIndex: 100,
    // top: 122,
  },
  content: {
    flex: 2,
  },
}

export const MeSkeleton = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.content}>
          <Skeleton width={150} height={35} />
          <Spacing.Horizontally px={16} />
          <Skeleton width={'88%'} height={35} />

          <Spacing.Horizontally px={23} />
          <Skeleton width={'100%'} height={16} />

          <Spacing.Horizontally px={10} />
          <Skeleton width={'58%'} height={13} />

          <Spacing.Horizontally px={12} />
          <Skeleton width={'50%'} height={13} />
        </View>

        <Skeleton width={80} height={80} radius="round" />
      </View>

      <PostSkeleton />
    </View>
  )
}

export default MeSkeleton
