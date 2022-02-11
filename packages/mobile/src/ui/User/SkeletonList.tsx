import React from 'react'
import { View } from 'react-native'
import UserSkeleton from './Skeleton'

const COUNT = 10

const SkeletonList = () => {
  return (
    <View style={{ marginTop: 15 }}>
      {new Array(COUNT).fill({}).map((_, index) => (
        <UserSkeleton key={index} />
      ))}
    </View>
  )
}

export default SkeletonList
