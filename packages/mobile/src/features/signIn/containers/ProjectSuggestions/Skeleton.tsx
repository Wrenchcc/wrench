import React from 'react'
import { Dimensions } from 'react-native'
import { View } from 'react-native'
import Skeleton from 'ui/Skeleton'

export const { width } = Dimensions.get('window')

const GUTTER = 20
export const BAR_SPACE = GUTTER / 2

const FollowingProjectsSkeleton = () => (
  <>
    <Skeleton height={15} width={'50%'} radius={0} style={{ marginTop: 5 }} />

    <View style={{ marginTop: 35, marginBottom: 40, flexDirection: 'row' }}>
      <Skeleton
        height={190}
        width={width - GUTTER * 2}
        radius={0}
        style={{ marginRight: GUTTER / 2 }}
      />
      <Skeleton height={190} width={width - GUTTER * 2} radius={0} />
    </View>

    <Skeleton height={15} width={'30%'} radius={0} style={{ marginTop: 5 }} />
    <View style={{ marginTop: 35, marginBottom: 40, flexDirection: 'row' }}>
      <Skeleton
        height={190}
        width={width - GUTTER * 2}
        radius={0}
        style={{ marginRight: GUTTER / 2 }}
      />
      <Skeleton height={190} width={width - GUTTER * 2} radius={0} />
    </View>
  </>
)

export default FollowingProjectsSkeleton
