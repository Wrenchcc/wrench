import React from 'react'
import { ScrollView, View } from 'react-native'
import * as Spacing from 'ui/Spacing'
import Skeleton from './Skeleton'
import { height } from './styles'

const COUNT = 4

export const SkeletonList: React.FC = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{
        paddingBottom: 10,
        paddingTop: 10,
      }}
    >
      {new Array(COUNT).fill({}).map((_, index) => (
        <View key={index}>
          <Spacing.Horizontally px={20} />
          <Skeleton key={index} height={height} />
        </View>
      ))}
    </ScrollView>
  )
}

export default SkeletonList
