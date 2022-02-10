import React from 'react'
import { ScrollView } from 'react-native'
import UserSkeleton from './Skeleton'

const COUNT = 10

const SkeletonList = (props) => {
  return (
    <ScrollView {...props}>
      {new Array(COUNT).fill({}).map((_, index) => (
        <UserSkeleton key={index} />
      ))}
    </ScrollView>
  )
}

export default SkeletonList
