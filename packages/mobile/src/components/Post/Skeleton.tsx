import React from 'react'
import { View, Dimensions } from 'react-native'
import Skeleton from 'ui/Skeleton'
import * as Spacing from 'ui/Spacing'

const { width } = Dimensions.get('window')

const GUTTER = 20

const styles = {
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 60,
  },
  content: {
    paddingTop: 18,
  },
}

export const PostSkeleton = () => {
  return (
    <>
      <View style={styles.top}>
        <View style={styles.left}>
          <Skeleton width={30} height={30} radius="round" />
          <View style={{ marginLeft: 10 }}>
            <Skeleton width={150} height={10} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Skeleton width={'100%'} height={10} />

        <Spacing.Horizontally px={10} />
        <Skeleton width={150} height={10} />

        <Spacing.Horizontally px={20} />
        <Skeleton
          width={width}
          height={width - GUTTER * 2}
          radius="square"
          style={{ marginLeft: -GUTTER, marginRight: -GUTTER }}
        />
      </View>
    </>
  )
}

export default PostSkeleton
