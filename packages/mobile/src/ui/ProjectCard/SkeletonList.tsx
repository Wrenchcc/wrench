import React from 'react'
import Skeleton from './Skeleton'
import { height } from './styles'

const COUNT = 4

export const SkeletonList: React.FC = () => {
  return new Array(COUNT)
    .fill({})
    .map((_, index) => <Skeleton key={index} height={height} style={{ marginBottom: 15 }} />)
}

export default SkeletonList
