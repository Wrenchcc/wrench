import React from 'react'
import HashtagSkeleton from './Skeleton'

const COUNT = 10

export const SkeletonList: React.FC = () => {
  return new Array(COUNT).fill({}).map((_, index) => <HashtagSkeleton key={index} />)
}

export default SkeletonList
