import React from 'react'
import UserSkeleton from './Skeleton'

const COUNT = 10

const SkeletonList = () => new Array(COUNT).fill({}).map((_, index) => <UserSkeleton key={index} />)

export default SkeletonList
