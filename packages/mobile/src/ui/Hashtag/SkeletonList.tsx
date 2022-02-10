import React from 'react'
import { ScrollView } from 'react-native'
import { CONTENT_INSET } from 'navigation/constants'
import { isAndroid } from 'utils/platform'
import HashtagSkeleton from './Skeleton'

const COUNT = 10

export const SkeletonList: React.FC = ({
  contentInset = isAndroid ? 0 : CONTENT_INSET,
  marginTop = 0,
}) => {
  return (
    <ScrollView contentInset={{ top: contentInset }} contentContainerStyle={{ marginTop }}>
      {new Array(COUNT).fill({}).map((_, index) => (
        <HashtagSkeleton key={index} />
      ))}
    </ScrollView>
  )
}

export default SkeletonList
