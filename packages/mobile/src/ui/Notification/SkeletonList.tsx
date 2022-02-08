import React from 'react'
import NotificationSkeleton from './Skeleton'

const COUNT = 10

const SkeletonList = () => {
  return new Array(COUNT).fill({}).map((_, index) => <NotificationSkeleton key={index} />)
}

export default SkeletonList
