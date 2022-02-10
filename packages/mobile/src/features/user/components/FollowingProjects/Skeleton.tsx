import React from 'react'
import { View } from 'react-native'
import Skeleton from 'ui/Skeleton'
import { width, GUTTER } from './styles'

const FollowingProjectsSkeleton = () => (
  <View style={{ marginTop: 20, flexDirection: 'row' }}>
    <Skeleton
      height={190}
      width={width - GUTTER * 2}
      radius={0}
      style={{ marginRight: GUTTER / 2 }}
    />
    <Skeleton height={190} width={width - GUTTER * 2} radius={0} />
  </View>
)

export default FollowingProjectsSkeleton
