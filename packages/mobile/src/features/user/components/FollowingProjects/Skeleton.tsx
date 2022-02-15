import React from 'react'
import { View, Dimensions } from 'react-native'
import Skeleton from 'ui/Skeleton'

const { width } = Dimensions.get('window')

const GUTTER = 20

const height = width > 390 ? 220 : 190

const FollowingProjectsSkeleton = () => (
  <View style={{ flexDirection: 'row' }}>
    <Skeleton
      height={height}
      width={width - GUTTER * 2}
      radius={0}
      style={{ marginRight: GUTTER / 2 }}
    />
    <Skeleton height={height} width={width - GUTTER * 2} radius={0} />
  </View>
)

export default FollowingProjectsSkeleton
