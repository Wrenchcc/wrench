import React from 'react'
import { View } from 'react-native'
import NotificationSkeleton from './Skeleton'

const COUNT = 10

const SkeletonList = () => {
  const data = new Array(COUNT).fill({}).map((_, index) => <NotificationSkeleton key={index} />)
  return <View style={{ flex: 1, marginTop: 15 }}>{data}</View>
}

export default SkeletonList
